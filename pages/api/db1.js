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

  //Carregar dados da guia geral
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const dbMetricasConsultoresAuto = rows.map(({
    id,
    consultor,
    puxadas,
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
      puxadas,
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

  //Carregar dados da guia metrica dia
  const sheetMetricaDia = doc.sheetsByIndex[1];
  const rowsMetricaDia = await sheetMetricaDia.getRows();
  const guiaMetricaDia = rowsMetricaDia.map(({
    Consultores,
    Puxadas,
    Carteirizadas,
    Vistorias_Realizadas,
    Pastas_Completas,
    Contratos_Emitidos,
    Pagos,
    Originacao,
    Data
  }) => {
    return {
      Consultores,
      Puxadas,
      Carteirizadas,
      Vistorias_Realizadas,
      Pastas_Completas,
      Contratos_Emitidos,
      Pagos,
      Originacao,
      Data
    }
  })

   //Carregar dados da guia metrica mes
   const sheetMetricaMes = doc.sheetsByIndex[2];
   const rowsMetricaMes = await sheetMetricaMes.getRows();
   const guiaMetricaMes = rowsMetricaMes.map(({
    Lider,
    mes,
    Consultores,
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
      Lider,
      mes,
      Consultores,
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

   //Carregar dados da guia Cadastro Consultores
   const sheetCadastroConsultores = doc.sheetsByIndex[3];
   const rowsCadastroConsultores= await sheetCadastroConsultores.getRows();
   const guiaCadastroConsultores = rowsCadastroConsultores.map(({
    Consultores,
    Email_Consultores,
    Login_Consultores,
    Time,
    Lider,
    AvatarConsultores  
  }) => {

    return {
    Consultores,
    Email_Consultores,
    Login_Consultores,
    Time,
    Lider,
    AvatarConsultores

     }
   })

   //Carregar dados da guia Cadastro Admin
   const sheetCadastroAdmin = doc.sheetsByIndex[4];
   const rowsCadastroAdmin= await sheetCadastroAdmin.getRows();
   const guiaCadastroAdmin = rowsCadastroAdmin.map(({
    Nome_Admin,
    Email_Admin,
    Login_Admin,
    Time,
    Avatar_Admin 
  }) => {

    return {
      Nome_Admin,
      Email_Admin,
      Login_Admin,
      Time,
      Avatar_Admin 
     }
   })

   //Carregar dados da guia parametros
   const sheetParametros = doc.sheetsByIndex[5];
   const rowsParametros= await sheetParametros.getRows();
   const guiaParametros = rowsParametros.map(({
    Meta_Dia_Puxadas,
    Meta_Dia_Carteirizadas,
    Meta_Dia_Vistorias_Realizadas,
    Meta_Dia_Pastas_Completas,
    Meta_Dia_Contratos_Emitidos,
    Meta_Mes_Puxadas,
    Meta_Mes_Carteirizadas,
    Meta_Mes_Vistorias_Realizadas,
    Meta_Mes_Pastas_Completas,
    Meta_Mes_Contratos_Emitidos

  }) => {

    return {
      Meta_Dia_Puxadas,
      Meta_Dia_Carteirizadas,
      Meta_Dia_Vistorias_Realizadas,
      Meta_Dia_Pastas_Completas,
      Meta_Dia_Contratos_Emitidos,
      Meta_Mes_Puxadas,
      Meta_Mes_Carteirizadas,
      Meta_Mes_Vistorias_Realizadas,
      Meta_Mes_Pastas_Completas,
      Meta_Mes_Contratos_Emitidos
     }
   })

  console.log('CONECTADO A BASE DE DADOS', doc.title);

  res.send({
    title: doc.title,
    dbMetricasConsultoresAuto,
    guiaMetricaDia,
    guiaMetricaMes,
    guiaCadastroConsultores,
    guiaCadastroAdmin,
    guiaParametros
  })
}



