import React, { useEffect } from "react";
import "./Folders.scss";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import ItemInput from "../components/itemInput/ItemInput";
import { useSelector, useDispatch } from "react-redux";
import { addFolder, editFolder, fetchFolders } from "../state/folders/foldersSlice";
import FolderTableElement from "../components/table/FolderTableElement";
import { RiFolderAddFill as AddFolderIcon } from "react-icons/ri";
import PopUpDelete from "../components/popup/PopUpDelete";
import PopUpEdit from "../components/popup/PopUpEdit";
import { openPopUp } from "../state/popup/popupSlice";
import { deleteFolder } from "../state/folders/foldersSlice";

function Folders() {
	const folders = useSelector((state) => state.folders);
	const popUpStatus = useSelector((state) => state.popup.status);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchFolders());
	}, []);

	const tableItems = folders.map((item) => {
		return { id: item.id, element: <FolderTableElement item={item} /> };
	});

	return (
		<>
			<div className="folders">
				<Header title="Folders" />
				<Table
					items={tableItems}
					rows={6}
					onEdit={(id) => {
						const item = folders.find((a) => a.id === id);
						dispatch(openPopUp({ status: "EDIT", data: item }));
					}}
					onDelete={(id) => {
						const item = folders.find((a) => a.id === id);
						console.log(item);
						dispatch(openPopUp({ status: "DELETE", data: item }));
					}}
				/>
				<ItemInput
					placeholder="New Folder"
					icon={<AddFolderIcon className="folders__icon-add" />}
					onAdd={(value) => {
						dispatch(addFolder(value));
					}}
				/>
			</div>
			{popUpStatus === "DELETE" && (
				<PopUpDelete type="folder" onDelete={(id) => dispatch(deleteFolder(id))} />
			)}
			{popUpStatus === "EDIT" && (
				<PopUpEdit
					type="folder"
					onEdit={(id, newValue) => {
						console.log("holi");
						dispatch(editFolder(id, newValue));
					}}
				/>
			)}
		</>
	);
}

export default Folders;
