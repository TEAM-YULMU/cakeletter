"use client";

import { OptionItem, Product } from "@/types/product";
import { createContext, PropsWithChildren, useContext, useReducer } from "react";

type State = Product;

type Action =
  | { type: "UPDATE_FIELD"; key: keyof Product; value: string | number }
  | { type: "ADD_IMAGES"; images: File[] }
  | { type: "REMOVE_IMAGE"; index: number }
  | { type: "ADD_OPTION_GROUP" }
  | { type: "REMOVE_OPTION_GROUP"; index: number }
  | { type: "UPDATE_OPTION_GROUP"; index: number; optionName: string }
  | { type: "ADD_OPTION_ITEM"; optionIndex: number }
  | { type: "REMOVE_OPTION_ITEM"; optionIndex: number; itemIndex: number }
  | { type: "UPDATE_OPTION_ITEM"; optionIndex: number; itemIndex: number; key: keyof OptionItem; value: string };

const initialState: State = {
  id: 0,
  storeId: 0,
  name: "",
  description: "",
  price: 0,
  images: [],
  options: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_FIELD": {
      return { ...state, [action.key]: action.value };
    }

    case "ADD_IMAGES":
      return {
        ...state,
        images: [...state.images, ...action.images.map((file) => ({ id: 0, productId: state.id, image: file }))],
      };

    case "REMOVE_IMAGE":
      return {
        ...state,
        images: state.images.filter((img, index) => index !== action.index),
      };

    case "ADD_OPTION_GROUP":
      return {
        ...state,
        options: [
          ...state.options,
          {
            id: Date.now(),
            productId: 0,
            name: "",
            required: false,
            multiple: false,
            items: [],
          },
        ],
      };

    case "REMOVE_OPTION_GROUP":
      return {
        ...state,
        options: state.options.filter((_, idx) => idx !== action.index),
      };

    case "UPDATE_OPTION_GROUP":
      return {
        ...state,
        options: state.options.map((g, idx) =>
          idx === action.index
            ? {
                ...g,
                name: action.optionName,
              }
            : g
        ),
      };
    case "ADD_OPTION_ITEM": {
      const updatedGroup = state.options.filter((g, index) => index === action.optionIndex)[0];
      if (!updatedGroup) {
        return state;
      }

      return {
        ...state,
        options: state.options.map((g, idx) =>
          idx === action.optionIndex
            ? {
                ...updatedGroup,
                items: [
                  ...updatedGroup.items,
                  {
                    id: Date.now(),
                    optionCategoryId: updatedGroup.id,
                    name: "",
                    description: "",
                  },
                ],
              }
            : g
        ),
      };
    }
    case "REMOVE_OPTION_ITEM": {
      const updatedGroup = state.options.filter((g, index) => index === action.optionIndex)[0];
      if (!updatedGroup) {
        return state;
      }

      return {
        ...state,
        options: state.options.map((g, idx) =>
          idx === action.optionIndex
            ? {
                ...updatedGroup,
                items: updatedGroup.items.filter((_, index) => index !== action.itemIndex),
              }
            : g
        ),
      };
    }

    case "UPDATE_OPTION_ITEM": {
      const updatedGroup = state.options.filter((g, index) => index === action.optionIndex)[0];
      if (!updatedGroup) {
        return state;
      }

      return {
        ...state,
        options: state.options.map((g, idx) =>
          idx === action.optionIndex
            ? {
                ...updatedGroup,
                items: updatedGroup.items.map((i, index) =>
                  index === action.itemIndex
                    ? {
                        ...i,
                        [action.key]: action.value,
                      }
                    : i
                ),
              }
            : g
        ),
      };
    }

    default:
      return state;
  }
}

const ProductContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const useProductContext = () => useContext(ProductContext);

type Props = {
  propsState?: State;
};

export const ProductProvider = ({ propsState, children }: PropsWithChildren<Props>) => {
  const [state, dispatch] = useReducer(reducer, propsState ?? initialState);

  return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};
