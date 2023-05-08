// import { Dashboard } from "@mui/icons-material";
import async from "../components/Async";
import { IRoute } from "../types/RouteType";


const Dashboard = async(() => import("../pages/dashboard/Dashboard"));
const About = async(() => import("../pages/About"));
const Config = async(() => import("../pages/config"));
const Company = async(() => import("../pages/baseInfo/company"));
const Department = async(() => import("../pages/baseInfo/department"));
const Employee = async(() => import("../pages/baseInfo/employee"));
const JobPosition = async(() => import("../pages/baseInfo/jobPosition"));

const Project = async(() => import("../pages/baseInfo/project"));
const Meal = async(() => import("../pages/restaurant/admin/meal"));
const MealsSetting_Monthly = async(() => import("../pages/restaurant/admin/mealsSetting_Monthly"));
const MealsSelection_CurrentMonth = async(() => import("../pages/restaurant/users/mealsSelection_CurrentMonth"));
const MealsSelection_NextMonth = async(() => import("../pages/restaurant/users/mealsSelection_NextMonth"));

const SignIn = async(() => import("../pages/security/authentication/signIn"))
const SignUp = async(() => import("../pages/security/authentication/signUp"))
const ChangePassword = async(() => import("../pages/security/authentication/changePassword"))
const ForgetPassword = async(() => import("../pages/security/authentication/forgetPassword"))
const Page404 = async(() => import("../pages/security/authentication/Page404"))

const ThongKe = async(() => import("../pages/security/thongKe/Dashboard"));
const DanhSachCaNhan = async(() => import("../pages/security/danhSachCaNhan/index"));
const DanhMucTinh = async(() => import("../pages/security/danhMucTinh/index"));



export const routes: Array<IRoute> = [
    {
        key: 'dashboard-route',
        title: 'Dashboard',
        path: '/',
        enabled: true,
        component: Dashboard
    },
    {
        key: 'about-route',
        title: 'About',
        path: '/about',
        enabled: true,
        component: About
    },
    {
        key: 'config-route',
        title: 'Config',
        path: '/config',
        enabled: true,
        component: Config
    },
    //------------------Base Info---------------------
    {
        key: 'company-route',
        title: 'Company',
        path: 'baseinfo/company',
        enabled: true,
        component: Company
    },
    {
        key: 'department-route',
        title: 'Department',
        path: 'baseinfo/department',
        enabled: true,
        component: Department
    },
    {
        key: 'project-route',
        title: 'Project',
        path: 'baseinfo/project',
        enabled: true,
        component: Project
    },
    {
        key: 'employee-route',
        title: 'Employee',
        path: 'baseinfo/employee',
        enabled: true,
        component: Employee
    },
    {
        key: 'jobPosition-route',
        title: 'JobPosition',
        path: 'baseinfo/jobPosition',
        enabled: true,
        component: JobPosition
    },
    //------------------Restaurant---------------------
    {
        key: 'meal-route',
        title: 'Meal',
        path: 'restaurant/meal',
        enabled: true,
        component: Meal
    },
    {
        key: 'mealssettingmonthly-route',
        title: 'MealsSettingMonthly',
        path: 'restaurant/mealssettingmonthly',
        enabled: true,
        component: MealsSetting_Monthly
    },
    {
        key: 'mealsselection_currentmonth-route',
        title: 'MealsSelection_CurrentMonth',
        path: 'restaurant/mealsselectioncurrentmonth',
        enabled: true,
        component: MealsSelection_CurrentMonth
    },
    {
        key: 'mealsselection_nextmonth-route',
        title: 'MealsSelection_NextMonth',
        path: 'restaurant/mealsselectionnextmonth',
        enabled: true,
        component: MealsSelection_NextMonth
    },
    //-------------Security Authentication-------------
    {
        key: 'changepassword-route',
        title: 'ChangePassword',
        path: 'auth/changepassword',
        enabled: true,
        component: ChangePassword
    },
    {
        key: 'page404-route',
        title: 'Page404',
        path: '*',
        enabled: true,
        component: Page404
    },    
    //-------------Security Authorization-------------
    {
        key: 'group-route',
        title: 'Group',
        path: 'security/group',
        enabled: true,
        component: ThongKe
    },
    {
        key: 'thongke-route',
        title: 'ThongKe',
        path: 'security/ThongKe',
        enabled: true,
        component: ThongKe
    },
   
    {
        key: 'danhsachcanhan-route',
        title: 'danhsachcanhan',
        path: 'danhsach/danhsachcanhan',
        enabled: true,
        component: DanhSachCaNhan
    },
    {
        key: 'danhmuctinh-route',
        title: 'danhmuctinh',
        path: 'danhmuc/danhmuctinh',
        enabled: true,
        component: DanhMucTinh
    },
]

export const authRoutes: Array<IRoute> = [
   //-------------Security Authentication-------------
   {
        key: 'signin-route',
        title: 'SignIn',
        path: '/',
        enabled: true,
        component: SignIn
    },
    {
        key: 'signup-route',
        title: 'SignUp',
        path: 'auth/signup',
        enabled: true,
        component: SignUp
    },
    {
        key: 'forgetpassword-route',
        title: 'ForgetPassword',
        path: 'auth/forgetpassword',
        enabled: true,
        component: ForgetPassword
    },
    {
        key: 'page404-route',
        title: 'Page404',
        path: '*',
        enabled: true,
        component: Page404
    },    
]