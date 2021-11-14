const oracledb = require('oracledb');

oracledb.initOracleClient({ libDir: '..\\testeoracle\\oracle' });

console.log('init');

async function run() {
  console.log('teste');
  let connection;

  try {

    connection = await oracledb.getConnection({ user: "ADMIN", password: "Yamazaki123456", connectionString: "db202111130826_high" });

    // Create a table

    // await connection.execute(`begin
    //                             execute immediate 'drop table nodetab';
    //                             exception when others then if sqlcode <> -942 then raise; end if;
    //                           end;`);

    // await connection.execute(`create table nodetab (id number, data varchar2(20))`);

    // Now query the rows back

    const result = await connection.execute(`SELECT * FROM PERSONS`);

    console.dir(result.rows, { depth: null });

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();