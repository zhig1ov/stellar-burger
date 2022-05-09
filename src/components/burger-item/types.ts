import { TIngredient } from '../../types'

export type TProps = {
	item: TIngredient;
	index: number;
	deleteIngredient: () => void;
	moveItem: (
		dragIndex: number,
		hoverIndex: number)
		=> void;
}

export type TDragItem = {
	index: number
	id: string
}