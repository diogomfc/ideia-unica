import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../credentials/credentials.json';

export default async function ApiDb(req, res) {

  const doc = new GoogleSpreadsheet('1YdVPwT7f9H-3ADXyMtKSP6JZ-r60Ans51EpgzruzIcw');

  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  });

  await doc.loadInfo(); // Carrega as infos da planilha
  //console.log('Titulo da planilha', doc.title);

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();


  //temploe2e
  const dbMetricasConsultoresAuto = rows.map(({
    id,
    consultor,
    carteirizadas,
    VA,
    VR,
    PC,
    VRobjetivo,
    PCobjetivo,
    MetaDia,
    data,
    img

  }) => {

    return {
      id,
      consultor,
      carteirizadas,
      VA,
      VR,
      PC,
      VRobjetivo,
      PCobjetivo,
      MetaDia,
      data,
      img
    }
  })

  console.log('CONECTADO A BASE DE DADOS', doc.title);

  res.send({
    title: doc.title,
    totalRow: sheet.rowCount,
    dbMetricasConsultoresAuto,
  })
}



