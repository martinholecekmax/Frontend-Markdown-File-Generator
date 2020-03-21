import React, { Component } from "react";
import NumberFormat from "react-number-format";
import accounting from "accounting";

class PriceField extends Component {
  constructor(props) {
    super(props);
    this.priceRef = React.createRef();
  }

  handleChange = () => {
    let price = accounting.unformat(this.priceRef.current.value);
    let e = {
      target: {
        value: price,
        id: this.props.id
      }
    };
    this.props.handleChange(e);
  };

  render() {
    return (
      <NumberFormat
        thousandSeparator={true}
        prefix="£"
        allowNegative={false}
        decimalScale={2}
        fixedDecimalScale={true}
        className="form-control"
        placeholder="£"
        getInputRef={this.priceRef}
        isNumericString={true}
        onValueChange={this.handleChange}
      />
    );
  }
}

export default PriceField;
