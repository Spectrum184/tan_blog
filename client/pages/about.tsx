import BlinkModel from "components/3d/BlinkModel";
import Layout from "components/Layout";
import Head from "next/head";

import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <Layout isHomepage={true}>
      <Head>
        <title>Giới thiệu</title>
      </Head>
      <div className="block w-full mt-3 h-96">
        <BlinkModel />
      </div>
      <div className="w-full">
        <section className="max-w-3xl text-center mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800">
            Hi,
            <span className="bg-green-600 text-white rounded px-1">
              I am Thanh
            </span>
            . Nice to meet you.
          </h2>
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A aliquam
            veniam suscipit eaque iure, eligendi harum expedita cupiditate
            sequi, culpa autem! Quaerat ex fugit iste suscipit reiciendis,
            accusamus ipsum quae.
          </p>
        </section>
        <section className="w-full bg-gray-600 rounded-sm p-8 mt-2 bg-circuit">
          <div className="text-center m-auto max-w-3xl text-white">
            <p className="text-2xl font-bold">About me:</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
              facilis sed illum illo natus accusamus ratione consectetur
              deserunt soluta itaque, tempore, nam quos rem voluptates harum
              enim laborum cupiditate. Ad!
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto, voluptates. Laudantium sapiente praesentium veritatis
              fugiat nesciunt ipsum, quia ducimus? Modi atque dolorum
              voluptatibus ipsum, sint placeat! Veritatis, corrupti? Odit, ab!
            </p>
          </div>
        </section>
        <section className="max-w-3xl text-center mx-auto"></section>
      </div>
    </Layout>
  );
};

export default About;
