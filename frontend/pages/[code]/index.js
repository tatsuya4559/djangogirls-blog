import {useRouter} from 'next/router';

const Code = (props) => {
  const router = useRouter();
  return (
    <div>
      <p>this page is code: {router.query.code}</p>
    </div>
  );
};

export default Code;
