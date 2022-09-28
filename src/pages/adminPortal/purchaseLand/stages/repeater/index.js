// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/default-props-match-prop-types */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/require-default-props */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-plusplus */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
// ** Third Party Components
import PropTypes from 'prop-types';

const Repeater = (props) => {
	// ** Props
	const { count, tag, children, ...rest } = props;

	// ** Custom Tag
	const Tag = tag;

	// ** Default Items
	const items = [];

	// ** Loop passed count times and push it in items Array
	for (let i = 0; i < count; i++) {
		items.push(children(i));
	}

	return <Tag {...rest}>{items}</Tag>;
};

// ** PropTypes
Repeater.propTypes = {
	count: PropTypes.number.isRequired,
	tag: PropTypes.string.isRequired,
};

// ** Default Props
Repeater.defaultProps = {
	tag: 'div',
};

export default Repeater;
