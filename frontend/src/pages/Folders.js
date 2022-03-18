import React, { useEffect } from "react";
import "./Folders.scss";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import ItemInput from "../components/itemInput/ItemInput";
import { useSelector, useDispatch } from "react-redux";
import { fetchFolders } from "../state/folders/foldersSlice";
import FolderTableElement from "../components/table/FolderTableElement";
import { RiFolderAddFill as AddFolderIcon } from "react-icons/ri";

function Folders() {
	const folders = useSelector((state) => state.folders);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchFolders());
	}, []);

	const tableItems = folders.map((item) => {
		return { id: item.id, element: <FolderTableElement item={item} /> };
	});

	return (
		<div className="folders">
			<Header title="Folders" />
			<Table items={tableItems} rows={6} onEdit={(id) => {}} onDelete={(id) => {}} />
			<ItemInput
				placeholder="New Folder"
				icon={<AddFolderIcon className="folders__icon-add" />}
				onAdd={(value) => {}}
			/>
		</div>
	);
}

export default Folders;
