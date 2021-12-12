import Layout from "components/Layout";
import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <Layout isHomepage={true}>
      <h1>About me!</h1>
    </Layout>
  );
};

export default About;
