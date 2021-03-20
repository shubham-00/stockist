import { Form, Input, Button, Col, Row, Card, Alert } from "antd";
import { connect } from "react-redux";
import * as actions from "../store/actions/authAction";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "../css/styles.css";

const Login = (props) => {
	useEffect(() => {
		if (props.token !== null) {
			props.history.push("/");
		}
	});

	const onFinish = (values) => {
		const username = values.username;
		const password = values.password;
		props.login(username, password);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Row className="my-5">
				<Col
					xs={{ span: 22, offset: 1 }}
					sm={{ span: 14, offset: 5 }}
					md={{ span: 10, offset: 7 }}
					lg={{ span: 8, offset: 8 }}
					xl={{ span: 6, offset: 9 }}
					xxl={{ span: 4, offset: 10 }}>
					<Card title="Login" className="shadow m-auto" style={{ width: 300 }}>
						{props.error ? (
							<>
								<Alert
									message={props.error}
									type="error"
									closable
									onClose={() => {
										props.resetError();
									}}
								/>
							</>
						) : null}
						<div>
							<Form
								name="basic"
								layout="vertical"
								onFinishFailed={onFinishFailed}
								onFinish={onFinish}
								style={{ display: "block" }}>
								<Form.Item
									label="Username"
									name="username"
									rules={[
										{
											required: true,
											message: "Please input your username!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									label="Password"
									name="password"
									rules={[
										{
											required: true,
											message: "Password cannot be blank!",
										},
									]}>
									<Input.Password />
								</Form.Item>

								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										loading={props.loading}
										icon={props.loading ? <LoadingOutlined /> : null}>
										Submit
									</Button>
								</Form.Item>
							</Form>
						</div>
					</Card>
				</Col>
			</Row>
		</>
	);
};

const mapStateToProps = (state) => {
	return state.auth;
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (username, password) => {
			dispatch(actions.login(username, password));
		},
		resetError: () => {
			dispatch(actions.resetError());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
