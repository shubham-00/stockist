import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, notification } from "antd";
import * as actions from "../store/actions/authAction";
import { MenuOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const CustomLayout = (props) => {
	const { Header, Content, Footer } = Layout;

	useEffect(() => {
		if (props.message) {
			notification.info({
				message: props.message,
				description: null,
				onClose: props.resetMessage(),
			});
			props.resetMessage();
		}
	});

	return (
		<>
			<Layout className="layout">
				<Header className="">
					<div className="logo" />
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={["/"]}
						selectedKeys={[props.location.pathname]}
						overflowedIndicator={<MenuOutlined />}
						triggerSubMenuAction="click">
						<Menu.Item key="/">
							<Link to="/">Home</Link>
						</Menu.Item>

						{props.token ? (
							<>
								<Menu.Item key="/logout/" onClick={() => props.logout()}>
									Logout
								</Menu.Item>
							</>
						) : (
							<>
								<Menu.Item key="/login/">
									<Link to="/login/">Login</Link>
								</Menu.Item>
							</>
						)}
					</Menu>
				</Header>
				<Content>
					<div className="site-layout-content">{props.children}</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>Footer </Footer>
			</Layout>
		</>
	);
};

const mapStateToProps = (state) => {
	return { token: state.auth.token };
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch(actions.logout());
		},
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CustomLayout),
);
