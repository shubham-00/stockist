const initialState = {
	error: null,
	token: null,
	loading: false,
};

const authReducer = (state = initialState, action) => {
	if (action.type === "AUTH_START") {
		console.log("AUTH_START");
		return { ...state, loading: true };
	}

	if (action.type === "AUTH_SUCCESS") {
		console.log("AUTH_SUCCESS");
		return { ...state, loading: false, token: action.payload.token, error: null };
	}

	if (action.type === "AUTH_FAIL") {
		console.log("AUTH_FAIL");
		return { ...state, loading: false, error: action.payload.error };
	}

	if (action.type === "AUTH_LOGOUT") {
		console.log("AUTH_LOGOUT");
		return { ...state, token: null };
	}

	if (action.type === "RESER_ERROR") {
		console.log("RESET_ERROR");
		return { ...state, error: null };
	}

	return state;
};

export { authReducer };
