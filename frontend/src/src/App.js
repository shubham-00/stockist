import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import CustomLayout from "./containers/CustomLayout";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/authAction";

const App = (props) => {
	useEffect(() => {
		props.autoLogin();
	});

	return (
		<div>
			<Router>
				<CustomLayout {...props}>
					<BaseRouter />
				</CustomLayout>
			</Router>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		autoLogin: () => {
			dispatch(actions.authCheckState());
		},
	};
};

export default connect(null, mapDispatchToProps)(App);
