"use client";

import { OptionCategory, OptionItem, Product } from "@/types/product";
import { createContext, PropsWithChildren, useContext, useReducer } from "react";

type State = Product & {
  removedUrlImages: string[];
};

type Action =
  | { type: "UPDATE_FIELD"; key: keyof Product; value: string | number }
  | { type: "ADD_IMAGES"; images: File[] }
  | { type: "REMOVE_IMAGE"; index: number }
  | { type: "ADD_OPTION_GROUP" }
  | { type: "REMOVE_OPTION_GROUP"; index: number }
  | { type: "UPDATE_OPTION_GROUP"; index: number; key: keyof OptionCategory; value: string | boolean }
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
  removedUrlImages: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_FIELD": {
      return { ...state, [action.key]: action.value };
    }

    case "ADD_IMAGES":
      return {
        ...state,
        images: [...state.images, ...action.images.map((file, index) => ({ id: Date.now() + index, productId: state.id, image: file }))],
      };

    case "REMOVE_IMAGE": {
      if (typeof state.images[action.index].image === "string") {
        state.removedUrlImages.push(state.images[action.index].image as string);
      }

      return {
        ...state,
        images: state.images.filter((img, index) => index !== action.index),
      };
    }

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
                [action.key]: action.value,
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
