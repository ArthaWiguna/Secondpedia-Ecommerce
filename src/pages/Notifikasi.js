import React from "react";
import NavigationBar from "../components/NavigationBar";
import ModalNotifikasi from "../components/ModalNotifikasi";
import { Helmet } from "react-helmet";

const Notifikasi = () => {
  return (
    <div className="px-2">
      <Helmet>
        <title>Secondpedia | Notifikasi</title>
      </Helmet>
      <NavigationBar />
      <ModalNotifikasi width={"full"} marginT={"120px"} paddingX={"236px"} />
    </div>
  );
};

export default Notifikasi;
