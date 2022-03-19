import React, { useEffect, useRef } from "react";
import "./Folders.scss";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import ItemInput from "../components/itemInput/ItemInput";
import { useSelector, useDispatch } from "react-redux";
import { addFolder, editFolder, fetchFolders, deleteFolder } from "../state/folders/foldersSlice";
import FolderTableElement from "../components/table/FolderTableElement";
import { RiFolderAddFill as AddFolderIcon } from "react-icons/ri";
import PopUpDelete from "../components/popup/PopUpDelete";
import PopUpEdit from "../components/popup/PopUpEdit";
import { openPopUp } from "../state/popup/popupSlice";

function Folders() {
	const firstLoad = useSelector((state) => state.folders.firstFetch);
	const folders = useSelector((state) => state.folders.folders);
	const popUpStatus = useSelector((state) => state.popup.status);
	const dispatch = useDispatch();
	const inputRef = useRef();

	useEffect(() => {
		if (firstLoad) inputRef.current.focus();
		dispatch(fetchFolders());
	}, []);

	return (
		<>
			<div className="folders">
				<Header title="Folders" />
				<Table
					items={folders.map((item) => (
						<FolderTableElement item={item} />
					))}
					rows={6}
					onEdit={(index) => {
						const item = folders[index];
						dispatch(openPopUp({ status: "EDIT", data: item }));
					}}
					onDelete={(index) => {
						const item = folders[index];
						dispatch(openPopUp({ status: "DELETE", data: item }));
					}}
				/>
				<ItemInput
					ref={inputRef}
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
					onEdit={(id, newValue) => dispatch(editFolder(id, newValue))}
				/>
			)}
		</>
	);
}

export default Folders;
