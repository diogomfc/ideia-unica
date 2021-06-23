function Tempo(props) {
  const dynamicDate = new Date();
  const dynamicDataString = dynamicDate.toGMTString();
  return (
    <div>
      <div>{dynamicDataString} (dinâmico)</div>
      <div>{props.staticDataString} (Estático)</div>
    </div>
  )
}

export function getStaticProps() {
  const staticDate = new Date();
  const staticDataString = staticDate.toGMTString();

  return {
    props: {
      staticDataString
    },
    revalidate: 1
  }
}

export default Tempo;