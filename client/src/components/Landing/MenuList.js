import React, { PureComponent } from 'react';
import { List } from 'react-virtualized/dist/commonjs/List';
import styled from 'styled-components';


// const height = 50;

const StyledList = styled(List)`
    background: #fff;
    width: 100%;
    overflow: hidden
`;

export default class MenuList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        const { width, height } = this.state;
        console.log(width, height);
        const {
            options, children, maxHeight, getValue,
        } = this.props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * 50;

        const rows = Array.isArray(children) ? children : [];

        function rowRenderer({
            key, index, style,
        }) {
            return (
                <div
                    key={key}
                    style={style}
                >
                    {rows[index]}
                </div>
            );
        }

        return (
            <StyledList
                ref={(el) => {
                    this.StyledList = el;
                }}
                height={maxHeight}
                width={width * 0.8}
                rowCount={rows.length}
                rowHeight={50}
                rowRenderer={rowRenderer}
                itemCount={children.length}
                initialScrollOffset={initialOffset}
                // {...props}
            >
                {({ index, style }) => <div style={style}>{children[index]}</div>}
            </StyledList>
        );
    }
}
