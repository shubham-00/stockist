import { connect } from "react-redux";
import { Table, Button } from "antd";

const ProductList = (props) => {
	const { Column } = Table;

	return (
		<>
			<Table dataSource={props.productList} pagination={false}>
				<Column title="Name" dataIndex="name" key="name" align="center" />
				<Column
					title="Opening"
					dataIndex="opening"
					key="opening"
					align="center"
				/>
				<Column
					title="Current"
					dataIndex="current"
					key="current"
					align="center"
				/>
				<Column title="Unit" dataIndex="unit" key="unit" align="center" />
				<Column
					title="Description"
					dataIndex="description"
					key="description"
					align="center"
				/>
				<Column
					title="Edit"
					dataIndex="pk"
					key="pk"
					align="center"
					render={(text, record, index) => {
						return (
							<>
								<Button
									size="small"
									ghost
									type="primary"
									onClick={() => {
										props.history.push(`/products/edit/${text}`);
									}}>
									Edit
								</Button>
							</>
						);
					}}
				/>
			</Table>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		productList: state.products.list,
	};
};

export default connect(mapStateToProps)(ProductList);
