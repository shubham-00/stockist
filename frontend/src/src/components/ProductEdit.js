import { connect } from "react-redux";
import { Form, Input, Button, InputNumber, Select, notification } from "antd";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import * as productActions from "../store/actions/productActions";
import * as authActions from "../store/actions/authAction";

const baseUrl = "http://127.0.0.1:8000/";

const ProductEdit = (props) => {
	const nameRef = useRef();

	const [name, setName] = useState("wait");
	const [description, setDescription] = useState("");
	const [opening, setOpening] = useState(0);
	const [unit, setUnit] = useState("kg");
	const [formVisibility, setFormVisibility] = useState(false);

	const pk = Number(props.match.params.pk);

	useEffect(() => {
		for (let i = 0; i < props.productList.length; i++) {
			if (Number(props.productList[i].pk) === pk) {
				setName(props.productList[i].name);
				setDescription(props.productList[i].description);
				setOpening(props.productList[i].opening);
				setUnit(props.productList[i].unit);
				setFormVisibility(true);
			}
		}
	}, [name, description, unit, opening, props.productList, pk]);

	useEffect(() => {
		if (formVisibility) {
			nameRef.current.focus();
		}
	}, [formVisibility]);

	const onFinish = (values) => {
		editProduct(props.token, values, props.productList);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const editProduct = (token, data, productList) => {
		axios
			.put(
				`${baseUrl}products/edit/`,
				{ ...data, pk },
				{
					validateStatus: (status) => {
						return status < 500;
					},
					headers: {
						Authorization: `Token ${token}`,
					},
				},
			)
			.then((res) => {
				if (res.data.error !== null && res.data.detail !== undefined) {
					props.logout();
					notification.error({
						message: "Access denied!",
						description: null,
						duration: 3,
					});
					window.location = "/";
				} else if (Array.isArray(res.data.name)) {
					props.setError("'Name' field is required");
				} else if (Array.isArray(res.data.description)) {
					props.setError("'Description' field is required");
				} else if (Array.isArray(res.data.opening)) {
					props.setError("'Opening stock' field is required");
				} else if (Array.isArray(res.data.unit)) {
					props.setError("'Unit' field is required");
				} else {
					let newProduct = res.data;

					for (let i = 0; i < productList.length; i++) {
						if (Number(productList[i].pk) === Number(newProduct.pk)) {
							productList[i] = newProduct;
						}
					}

					props.fetchSuccess([]);
					props.fetchSuccess(productList);
					notification.success({
						message: "Product edited!",
						description: null,
						duration: 3,
					});
					nameRef.current.focus();
					props.history.push("/products/list/");
				}
			})
			.catch((err) => {
				console.log("Something went wrong");
			});
	};

	return (
		<>
			<div className="row">
				<div className="col-sm-10 col-md-6 col-lg-4 mx-auto">
					<div className="card p-5">
						<div className="card-body">
							<h3 className="text-center">
								<u>Editing a product</u>
							</h3>
							{formVisibility ? (
								<Form
									preserve={true}
									initialValues={{ name: name }}
									layout="vertical"
									name="basic"
									onFinish={onFinish}
									onFinishFailed={onFinishFailed}>
									<Form.Item
										label="Name"
										name="name"
										fields={[
											{
												name: "name",
												value: name,
											},
										]}
										rules={[
											{
												required: true,
												message: "Enter your product's name!",
											},
										]}>
										<Input ref={nameRef} />
									</Form.Item>

									<Form.Item
										label="Description"
										name="description"
										initialValue={description || ""}
										rules={[
											{
												required: false,
												message: "Enter your product's description!",
											},
										]}>
										<Input.TextArea rows={5} showCount maxLength={1000} />
									</Form.Item>

									<Form.Item
										label="Opening stock"
										name="opening"
										initialValue={opening || 0}
										rules={[
											{
												required: false,
												message: "Enter your product's opening stock!",
											},
										]}>
										<InputNumber />
									</Form.Item>

									<Form.Item
										label="Unit"
										name="unit"
										initialValue={unit || "kg"}
										rules={[
											{
												required: false,
												message: "Enter your product's unit!",
											},
										]}>
										<Select>
											<Select.Option value="kg">kg</Select.Option>
											<Select.Option value="bag">bag</Select.Option>
											<Select.Option value="mtr">mtr</Select.Option>
											<Select.Option value="nos">nos</Select.Option>
										</Select>
									</Form.Item>

									<Form.Item>
										<Button type="primary" htmlType="submit">
											Submit
										</Button>
									</Form.Item>
								</Form>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		productList: state.products.list,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch(authActions.logout());
		},
		setError: (msg) => {
			dispatch(productActions.setError(msg));
		},
		fetchSuccess: (productList) => {
			dispatch(productActions.fetchSuccess(productList));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
