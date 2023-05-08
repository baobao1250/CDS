import { RootState } from "apis/redux/reducers/rootReducer";
import { getToken, getUserId } from "helpers/localStorage";
import jwt_decode from "jwt-decode";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { doLogin, failAuthen } from "redux/actions/AuthenticateAction";
import { UserInfo } from "redux/reducers/authenticateReducer";
import { CreateConnectionService } from "../apis/cauHinhFlow/createConnectionService";

export interface AuthProps {
    Component: any;
    reload?: boolean;
}

export default function ({ Component, reload }: AuthProps) {
    class AuthenticationCheck extends React.Component<any, any> {
        state = { loading: true, token: "" };
        componentDidMount() {
            this.checkAuthenticate();

            // const { isAuthenticated, userInfo } = this.props;
            //
            this.setState({ loading: false });
        }
        componentWillUnmount() {
            this.setState({ loading: false });
        }

        async handleEditItem() {
            const id = localStorage.getItem("id_flow");
            if (id) {
                const { message, code } = await new CreateConnectionService().checkStatusEdit("", id.replace(/\"/g, ""));
                localStorage.setItem("id_flow", "");
            }
        }

        async checkAuthenticate() {
            this.handleEditItem();
            const TOKEN = getToken();
            const C_USER = getUserId();
            if (TOKEN && C_USER) {
                try {
                    const payload: { sub: string; exp: number; iat: number } = await jwt_decode(TOKEN);
                    const nowDate = moment(new Date());
                    const expDate = moment(new Date(payload.exp * 1000));

                    if (moment(nowDate).isAfter(expDate)) {
                        localStorage.clear();
                        this.props.history.replace("/admin/login");
                    }
                    this.props.login({ avatar: "", userName: payload.sub });
                } catch (error) {
                   
                }
            }
            if (!TOKEN) {
                localStorage.clear();
                this.props.history.replace("/admin/login");
            }
            if (TOKEN && !C_USER) {
                localStorage.clear();
                this.props.history.replace("/admin/login");
            }
        }

        render() {
            if (this.state.loading) return <div>Loading......</div>;
            return Component;
        }
    }
    function mapStateToProps(state: RootState) {
        return {
            isAuthenticated: state.authenticate.isAuthenticated,
            userInfo: state.authenticate.userInfo,
        };
    }
    const mapDispatchToProps = (dispatch: any) => {
        return {
            failAuthen: () => dispatch(failAuthen()),
            login: (payload: UserInfo) => dispatch(doLogin(payload)),
        };
    };
    return connect(mapStateToProps, mapDispatchToProps)(AuthenticationCheck);
}
