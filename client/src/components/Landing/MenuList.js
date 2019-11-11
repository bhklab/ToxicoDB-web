import React, { PureComponent } from 'react';
// import List from 'react-virtualized/dist/commonjs/List';
// import _ from 'lodash';
import { FixedSizeList as List } from "react-window";

export default class MenuList extends PureComponent {
//   render() {
//     const {
//       children, maxHeight,
//     } = this.props;

//     const height = 65;
//     const rows = Array.isArray(children) ? children : [];
//     const rowRenderer = ({
//       key, index, style,
//     }) => (
//       <div
//         key={key}
//         style={{
//           ...style,
//           width: '500px',
//         }}
//       >
//         {rows[index]}
//       </div>
//     );


//     const scrollToIndex = _.findLastIndex(
//       children,
//       child => child.props.isFocused,
//     );

//     return (
//       <List
//         height={maxHeight}
//         rowHeight={height}
//         itemCount={children.length}
//         itemSize={height}
//         width={500}
//         rowCount={rows.length}
//         rowRenderer={rowRenderer}
//         scrollToIndex={scrollToIndex}
//       />
//     );
//   }
render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * 50;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={50}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}
