import React, { useState } from "react";
import "./App.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

import Editor from "./pages/Editor";

const productModel = [
  {
    id: 1,
    field: "path",
    type: "string"
  },
  {
    id: 2,
    field: "productType",
    type: "select",
    values: ["calculator", "simple", "group"]
  },
  {
    id: 3,
    field: "title",
    type: "string"
  },
  {
    id: 4,
    field: "productCategory",
    type: "string"
  },
  {
    id: 5,
    field: "sku",
    type: "string"
  },
  {
    id: 6,
    field: "image",
    type: "string"
  },
  {
    id: 7,
    field: "minQty",
    type: "number"
  },
  {
    id: 8,
    field: "unit",
    type: "string"
  },
  {
    id: 9,
    field: "price",
    type: "number"
  },
  {
    id: 10,
    field: "visible",
    type: "bool"
  },
  {
    id: 11,
    field: "priceTiers",
    type: "array",
    elementType: "object",
    values: [
      {
        key: "amount",
        type: "string"
      },
      {
        key: "price",
        type: "string"
      }
    ]
  },
  {
    id: 12,
    field: "moreInformation",
    type: "array",
    elementType: "object",
    values: [
      {
        key: "name",
        type: "string"
      },
      {
        key: "value",
        type: "string"
      }
    ]
  },
  {
    id: 13,
    field: "inStock",
    type: "bool"
  },
  {
    id: 14,
    field: "uk",
    type: "bool"
  },
  {
    id: 15,
    field: "relatedProducts",
    type: "array",
    elementType: "string"
  },
  {
    id: 16,
    field: "offer",
    type: "bool"
  },
  {
    id: 19,
    field: "bayWidth",
    type: "number"
  },
  {
    id: 20,
    field: "components",
    type: "array",
    elementType: "object",
    values: [
      {
        key: "name",
        type: "string"
      },
      {
        key: "quantity",
        type: "string"
      }
    ]
  },
  {
    id: 21,
    field: "downloads",
    type: "array",
    elementType: "object",
    values: [
      {
        key: "name",
        type: "string"
      },
      {
        key: "link",
        type: "string"
      }
    ]
  },
  {
    id: 22,
    field: "enableGroupImages",
    type: "bool"
  },
  {
    id: 23,
    field: "genericOptions",
    type: "array",
    elementType: "string"
  },
  {
    id: 24,
    field: "groupDescription",
    type: "string"
  },
  {
    id: 25,
    field: "groupProducts",
    type: "array",
    elementType: "string"
  },
  {
    id: 26,
    field: "groupTitle",
    type: "string"
  },
  {
    id: 27,
    field: "pallet",
    type: "bool"
  },
  {
    id: 28,
    field: "pricePerMeter",
    type: "number"
  },
  {
    id: 29,
    field: "productDisabled",
    type: "bool"
  },
  {
    id: 30,
    field: "searchPriority",
    type: "number"
  },
  {
    id: 31,
    field: "shoppingDesc",
    type: "string"
  },
  {
    id: 12,
    field: "filters",
    type: "array",
    elementType: "object",
    values: [
      {
        key: "name",
        type: "string"
      },
      {
        key: "value",
        type: "string"
      }
    ]
  },
  {
    id: 32,
    field: "color",
    type: "array",
    elementType: "object",
    values: [
      {
        key: "value",
        type: "string"
      }
    ]
  },
  {
    id: 33,
    field: "productOptions",
    type: "array",
    elementType: "object",
    values: [
      {
        key: "optionName",
        type: "string"
      },
      {
        key: "optionType",
        type: "select",
        values: ["radio", "swatch", "switch", "select"]
      },
      {
        key: "oneOff",
        type: "bool"
      },
      {
        key: "optionQuestion",
        type: "string"
      },
      {
        key: "optionSubtitle",
        type: "string"
      },
      {
        key: "optionName",
        type: "string"
      },
      {
        key: "qtyInput",
        type: "bool"
      },
      {
        key: "options",
        type: "array",
        elementType: "object",
        values: [
          {
            key: "name",
            type: "string"
          },
          {
            key: "priceModifier",
            type: "number"
          },
          {
            key: "quantityModifier",
            type: "number"
          },
          {
            key: "color",
            type: "string"
          },
          {
            key: "stockMessage",
            type: "string"
          },
          {
            key: "optionId",
            type: "string"
          },
          {
            key: "disableArray",
            type: "array",
            elementType: "string"
          },
          {
            key: "tierPriceModifier",
            type: "array",
            elementType: "object",
            values: [
              {
                key: "amount",
                type: "string"
              },
              {
                key: "price",
                type: "string"
              }
            ]
          },
          {
            key: "modifiedBy",
            type: "array",
            elementType: "object",
            values: [
              {
                key: "amount",
                type: "string"
              },
              {
                key: "name",
                type: "string"
              }
            ]
          },
          {
            key: "modifyQtyBy",
            type: "array",
            elementType: "object",
            values: [
              {
                key: "amount",
                type: "string"
              },
              {
                key: "name",
                type: "string"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 34,
    field: "html",
    type: "string"
  }
];

const categoryModel = [
  {
    id: 1,
    field: "path",
    type: "string"
  },
  {
    id: 2,
    field: "title",
    type: "string"
  },
  {
    id: 3,
    field: "image",
    type: "string"
  },
  {
    id: 3,
    field: "type",
    type: "string"
    // Default category
  },
  {
    id: 4,
    field: "category",
    type: "string"
    // Must be unique to all categories
  },
  {
    id: 5,
    field: "categoryProducts",
    type: "array",
    elementType: "string"
  },
  {
    id: 6,
    field: "subCategories",
    type: "array",
    elementType: "string"
  },
  {
    id: 7,
    field: "filterOptions",
    type: "array",
    elementType: "object",
    values: [
      {
        key: "name",
        type: "string"
      },
      {
        key: "optionType",
        type: "string"
      },
      {
        key: "options",
        type: "array",
        elementType: "string"
      }
    ]
  },
  {
    id: 8,
    field: "html",
    type: "string"
  }
];

const AddButon = ({ handleAddValue, value }) => {
  return (
    <button className="btn btn-success m-3" onClick={handleAddValue}>
      {value}
    </button>
  );
};

function App() {
  const [modelSwitch, setModelSwitch] = useState("product");

  const handleAddValue = newValue => {
    setModelSwitch(newValue);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="pl-4">
          <AddButon
            handleAddValue={() => handleAddValue("product")}
            value="Product Model"
          />
          <AddButon
            handleAddValue={() => handleAddValue("category")}
            value="Category Model"
          />
        </div>
        {modelSwitch === "product" ? <Editor model={productModel} /> : null}
        {modelSwitch === "category" ? <Editor model={categoryModel} /> : null}
      </PersistGate>
    </Provider>
  );
}

export default App;
