import { TIngredient } from '../../types'

export type TIngredientWithProductId = TIngredient & { productId: string }

export type TProps = {
	onDropHandler: (item: TIngredient)
		=> void;
}