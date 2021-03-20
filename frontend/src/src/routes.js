import { Route } from "react-router-dom";
import Home from "./components/Home";
import { connect } from "react-redux";
import Login from "./components/Login";

const BaseRouter = (props) => {
	return (
		<div>
			<Route exact path="/" component={Home} />
			<Route exact path="/login/" component={Login} />
			{/* <Route exact path="/article/:articleID/" component={ArticleDetail} /> */}
		</div>
	);
};

const mapStateToProps = (state) => {
	return { token: state.auth.token };
};

export default connect(mapStateToProps, null)(BaseRouter);
