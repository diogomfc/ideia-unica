import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../credentials/credentials.json';

export default async function ApiDb(req, res) {

  const doc = new GoogleSpreadsheet('1HXMzQlAILM16XhMAfk47nokaNQcy1bNDFVotMRwjeKw');

  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  });

  await doc.loadInfo(); // Carrega as infos da planilha
  //console.log('Titulo da planilha', doc.title);

  const dbBaseMes = doc.sheetsByIndex[0]; //carregar tabela planilha da dbBaseMetricasConsultores01
  const rows = await dbBaseMes.getRows();


  //Mapeando linhas e colunas da tabela dbBaseMetricasConsultores01
  const dbMetricasConsultores01_dbBaseMes = rows.map(({
    lider,
    mes,
    consultor,
    produtividade,
    meta_MTD,
    meta_Total,
    atingimento_Produtividade,
    originacao_Real,
    originacao_MTD,
    meta_Originacao,
    atingimento_Originacao,
    sem1,
    sem2,
    sem3,
    sem4,
    sem5,
    atingiemento,
    upsell,
    originacao,
    upsellsPagos
  }) => {

    return {
      lider,
      mes,
      consultor,
      produtividade,
      meta_MTD,
      meta_Total,
      atingimento_Produtividade,
      originacao_Real,
      originacao_MTD,
      meta_Originacao,
      atingimento_Originacao,
      sem1,
      sem2,
      sem3,
      sem4,
      sem5,
      atingiemento,
      upsell,
      originacao,
      upsellsPagos
    }
  })

  console.log('CONECTADO A BASE DE DADOS', doc.title);

  res.send({
    title: doc.title,
    dbMetricasConsultores01_dbBaseMes,
  })
}



