const sql = require('mssql/msnodesqlv8');
const camelCaseDeep = require('camelcase-object-deep');

const config = {
    database: 'homework6_6',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const addParticipant = async participant => {
    await sql.connect(config);

    const { name, email } = participant;
    await sql.query`INSERT INTO Participants (Name, Email) VALUES(${name}, ${email})`;

    await sql.close();
}

const getParticipants = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT * FROM Participants`;
    await sql.close();

    return recordset;
}

const addBill = async bill => {
    await sql.connect(config);
        
    const { amount, checkedIds } = bill;
    const{recordset} = await sql.query`INSERT INTO Bills (Amount, Date) VALUES(${amount},${new Date()} ) SELECT SCOPE_IDENTITY() as 'id'`;
    checkedIds.foreach(p=> addParticipantsBills(recordset, p))
    await sql.close();
    return recordset[0].id;
}

const addParticipantsBills = async participantBill => {
    await sql.connect(config);

    const { billId, participantId } = participantBill;
    await sql.query`INSERT INTO ParticipantsBills (ParticipantId, BillId) VALUES(${participantId}, ${billId})`;

    await sql.close();
    
}

const getBills = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT b.*, count(pb.participantId) AS 'participantCount' FROM Bills b
                                LEFT JOIN ParticipantsBills pb
                                ON b.Id = pb.BillId
                                GROUP BY b.id, b.Amount, b.Date`;
    await sql.close();

    return recordset;
}

const getBill = async id => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT b.*, p.*  FROM Bills b
                                Left JOIN ParticipantsBills pb
                                ON b.Id = pb.BillId
								Left Join Participants p
								On pb.ParticipantId = p.Id
                                where b.Id = ${id}`;
    await sql.close();

    return recordset;
}

module.exports = { addParticipant, getParticipants, addBill, addParticipantsBills, getBills, getBill };