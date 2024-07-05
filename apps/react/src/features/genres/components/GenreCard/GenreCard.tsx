import React from "react";
import { Genre } from "@js-camp/core/models/genre";

import styles from "./GenreCard.module.css";

interface Props {
	/** Genre. */
	readonly genre: Genre;
}

/** Card with genre data. */
const GenreCardComponent: React.FC<Props> = ({ genre }) => (
	<div className={styles.card}>
		<h2>{genre.name}</h2>
		<span>Id - {genre.id}</span>
	</div>
);

export const GenreCard = React.memo(GenreCardComponent);
