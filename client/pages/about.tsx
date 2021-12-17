import BlinkModel from "components/3d/BlinkModel";
import Layout from "components/Layout";

import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <Layout isHomepage={true}>
      <div className="block w-full mt-3 h-96">
        <BlinkModel />
      </div>
    </Layout>
  );
};

export default About;
