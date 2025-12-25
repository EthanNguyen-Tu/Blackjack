import { ReactNode } from "react";
import styles from "./Table.module.css";

interface TableProps {
    game: ReactNode;
}

function Table({ game }: TableProps) {
    return <div id={styles.table}>{game}</div>;
}

export default Table;
