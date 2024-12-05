import React, { useEffect, useState } from "react";
import useListStore from "../store/listStore";
import ClientDetail from "../components/ClientDetail";
import OrderMenu from "../components/OrderMenu";
import SideBar from "../components/SideBar";
import { useNavigate, useParams } from "react-router-dom";

const ActionPage = () => {
  const actionGetListMenuById = useListStore(
    (state) => state.actionGetListMenuById
  );
  const actionGetListById = useListStore((state) => state.actionGetListById);
  const setCurrentListMenu = useListStore((state)=>state.setCurrentListMenu)
  const lists = useListStore((state) => state.lists);
  const listMenu = useListStore((state) => state.listMenu);
  const { id } = useParams();
  const navigate = useNavigate();
  const defaultPage = 3

  useEffect(() => {
    if (!id) {
      return navigate(`/${defaultPage}`);
    }
  }, []);

  useEffect(() => {
    actionGetListMenuById(id);
    actionGetListById(id);
    setCurrentListMenu(id)
  }, [id]);

  return (
    <>
      <ClientDetail />
      <div className="content-container">
        <OrderMenu />
        <SideBar />
      </div>
    </>
  );
};

export default ActionPage;
