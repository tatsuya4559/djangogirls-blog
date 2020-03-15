import Link from 'next/link';
import axios from "axios";

const Index = props => {
  const code = 123;
  return (
    <div>
      <h1>Next.js Page</h1>
      <p>my name is {props.name}</p>
      <Link href="/[code]" as={`/${code}`}><a>Code page</a></Link>
    </div>
  );
};

Index.getInitialProps = async context => {
  const response = await axios.get("http://127.0.0.1:8000/api/test");
  return response.data;
};

export default Index;
