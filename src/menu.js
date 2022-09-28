import subDir from './baseURL/subDir';

export const homeMenu = {
	intro: { id: 'intro', text: 'Intro', path: `${subDir}#intro', icon: 'Vrpano`, subMenu: null },
	bootstrap: {
		id: 'bootstrap',
		text: 'Bootstrap Components',
		path: `${subDir}#bootstrap`,
		icon: 'BootstrapFill',
		subMenu: null,
	},
	storybook: {
		id: 'storybook',
		text: 'Storybook',
		path: `${subDir}#storybook`,
		icon: 'CustomStorybook',
		subMenu: null,
	},
	formik: {
		id: 'formik',
		text: 'Formik',
		path: `${subDir}#formik`,
		icon: 'CheckBox',
		subMenu: null,
	},
	apex: {
		id: 'apex',
		text: 'Apex Charts',
		path: `${subDir}#apex`,
		icon: 'AreaChart',
		subMenu: null,
	},
};

export const rolesAdmin = {
	roles: {
		id: 'roles',
		text: 'Admin Role',
		icon: 'Extension',
	},
	adminRoles: {
		id: 'adminRoles',
		text: 'Admin Roles',
		path: `${subDir}roleAdmin`,
		icon: 'Dashboard',
		subMenu: {
			addAdmin: {
				id: 'addForm',
				text: 'Add Role',
				path: `${subDir}roleAdmin/createRole`,
				icon: 'Dashboard',
				notification: false,
			},
			listAdmin: {
				id: 'listForm',
				text: 'List',
				path: `${subDir}roleAdmin/listAdmins`,
				icon: 'Window',
				subMenu: null,
			},
		},
	},
};

export const bookingForm = {
	booking: {
		id: 'booking',
		text: 'Booking Section',
		icon: 'Extension',
	},

	plotsLiting: {
		id: 'plotFrom',
		text: 'Manage',
		path: `${subDir}manage`,
		icon: 'Dashboard',
		subMenu: {
			// addPlots: {
			// 	id: 'addForm',
			// 	text: 'Book now',
			// 	path: `${subDir}roleAdmin/addBooking`,
			// 	icon: 'Dashboard',
			// 	notification: false,
			// },
			Plotisting: {
				id: 'plotListing',
				text: 'All Plots',
				path: `${subDir}manage/allPlots`,
				icon: 'Window',
				subMenu: null,
			},
		},
	},
};
export const adminPortal = {
	adminpages: {
		id: 'adminpages',
		text: 'Admin Portal',
		icon: 'Extension',
	},
	admindashboard: {
		id: 'admindashboard',
		text: 'Dashboard',
		path: `${subDir}`,
		// path: `${subDir}Dashboard/`,
		icon: 'Dashboard',
		subMenu: null,
	},
	pL: {
		id: 'aPL',
		text: 'Lands',
		path: `${subDir}adminPortal/lands.ts`,
		icon: 'Dashboard',
		subMenu: {
			purchaseLand: {
				id: 'adminpurchaseLand',
				text: 'Purchase Land',
				path: `${subDir}adminPortal/lands/purchaseLand`,

				icon: 'Dashboard',
				notification: true,
			},
			viewPurchaseLand: {
				id: 'adminviewPurchaseLand',
				text: 'View Lands',
				path: `${subDir}adminPortal/lands/viewPurchaseLand`,
				icon: 'Window',
				subMenu: null,
			},
		},
	},

	viewKhasrasRecord: {
		id: 'adminviewKhasrasRecord',
		text: 'Khasra Report',
		path: `${subDir}adminPortal/viewKhasrasRecord`,
		icon: 'Window',
		subMenu: null,
	},
	viewMouzasRecord: {
		id: 'adminviewMouzasRecord',
		text: 'Mouza Report',
		path: `${subDir}adminPortal/viewMouzasRecord`,
		icon: 'Window',
		subMenu: null,
	},
};

export const accountsModule = {
	accountsHeading: {
		id: 'accountsHeading',
		text: 'Accounts',
		icon: 'Extension',
	},
	accounts: {
		id: 'accounts',
		text: 'Accounts',
		path: `${subDir}accounts/transactions`,
		icon: 'Dashboard',
		subMenu: {
			manageAccountsSubgroups: {
				id: 'accountsManageAccountsSubgroups',
				text: 'Manage Accounts',
				path: `${subDir}accounts/transactions/Subgroups`,
				icon: 'Window',
			},
			newTransaction: {
				id: 'accountsNewTransaction',
				text: 'All Vouchers',
				path: `${subDir}accounts/transactions/new`,
				icon: 'Dashboard',
			},
			depreciation: {
				id: 'depreciation',
				text: 'Depreciation',
				path: `${subDir}accounts/transactions/Depreciation`,
				icon: 'Dashboard',
			},
		},
	},
	vouchers: {
		id: 'vouchers',
		text: 'Vouchers',
		path: `${subDir}accounts/vouchers`,
		icon: 'Dashboard',
	},
	fileVouchers: {
		id: 'fileVouchers',
		text: 'Land Vouchers',
		path: `${subDir}accounts/fileVouchers`,
		icon: 'Dashboard',
	},
	viewTransactions: {
		id: 'accountsViewTransactions',
		text: 'Financial Statements',
		path: `${subDir}accounts/transactions/view`,
		icon: 'Window',
		subMenu: null,
	},
};
export const employeesModule = {
	employeesHeading: {
		id: 'employeesHeading',
		text: 'Employees',
		icon: 'Extension',
	},
	employees: {
		id: 'employees',
		text: 'Employees',
		path: `${subDir}employees/`,
		icon: 'Dashboard',
		subMenu: {
			manageEmployees: {
				id: 'employeesManage',
				text: 'Manage',
				path: `${subDir}employees/manage`,
				icon: 'Window',
			},
			payrollEmployees: {
				id: 'employeesPayroll',
				text: 'Generate Payroll',
				path: `${subDir}employees/generatePayroll`,
				icon: 'Window',
			},
			viewPayrollsEmployees: {
				id: 'viewEmployeesPayroll',
				text: 'View Payrolls',
				path: `${subDir}employees/viewPayrolls`,
				icon: 'Window',
			},
		},
	},
};
export const listings = {
	listingsHeading: {
		id: 'listingsHeading',
		text: 'Listings',
		icon: 'Extension',
	},
	listings: {
		id: 'listings',
		text: 'Listings',
		path: `${subDir}listings/`,
		icon: 'Dashboard',
		subMenu: {
			managePersons: {
				id: 'personsManage',
				text: 'Manage Persons',
				path: `${subDir}listings/managePersons`,
				icon: 'Window',
			},
			manageMouza: {
				id: 'mouzaManage',
				text: 'Manage Mouza',
				path: `${subDir}persons/manageMouza`,
				icon: 'Window',
			},
			manageKhasra: {
				id: 'khasraManage',
				text: 'Manage Khasra',
				path: `${subDir}persons/manageKhasra`,
				icon: 'Window',
			},
		},
	},
};
export const loanModule = {
	loanHeading: {
		id: 'loanHeading',
		text: 'Loan Amortization',
		icon: 'Extension',
	},
	loan: {
		id: 'loan',
		text: 'Loan Amortization',
		path: `${subDir}loan/`,
		icon: 'Dashboard',
		subMenu: {
			manageLoans: {
				id: 'loanManage',
				text: 'Manage',
				path: `${subDir}loan/manage`,
				icon: 'Window',
			},
		},
	},
};
export const dashboardMenu = {
	dashboard: {
		id: 'dashboard',
		text: 'REHBAR Module 1',
		path: `${subDir}/dashboard`,
		icon: 'Dashboard',
		subMenu: null,
	},
	dashboardBooking: {
		id: 'dashboard-booking',
		text: 'REHBAR Module 2 ',
		path: `${subDir}dashboard-booking`,
		icon: 'emoji_transportation',
		subMenu: null,
	},
	crmDashboard: {
		id: 'crmDashboard',
		text: 'REHBAR Module 3',
		path: `${subDir}crm/dashboard`,
		icon: 'RecentActors',
	},
	summary: {
		id: 'summary',
		text: 'REHBAR Module 4',
		path: `${subDir}summary`,
		icon: 'sticky_note_2',
		subMenu: null,
	},
};

export const demoPages = {
	pages: {
		id: 'pages',
		text: 'Pages',
		icon: 'Extension',
	},
	singlePages: {
		id: 'singlePages',
		text: 'Single Pages',
		path: `${subDir}single-pages`,
		icon: 'Article',
		subMenu: {
			boxedSingle: {
				id: 'boxedSingle',
				text: 'Boxed',
				path: `${subDir}single-pages/boxed`,
				icon: 'ViewArray',
			},
			fluidSingle: {
				id: 'fluidSingle',
				text: 'Fluid',
				path: `${subDir}single-pages/fluid`,
				icon: 'ViewDay',
			},
		},
	},
	listPages: {
		id: 'listPages',
		text: 'List Pages',
		path: `${subDir}list-pages`,
		icon: 'Dvr',
		subMenu: {
			listBoxed: {
				id: 'listBoxed',
				text: 'Boxed List',
				path: `${subDir}list-pages/boxed-list`,
				icon: 'ViewArray',
			},
			listFluid: {
				id: 'listFluid',
				text: 'Fluid List',
				path: `${subDir}list-pages/fluid-list`,
				icon: 'ViewDay',
			},
		},
	},
	gridPages: {
		id: 'gridPages',
		text: 'Grid Pages',
		path: `${subDir}grid-pages`,
		icon: 'Window',
		subMenu: {
			gridBoxed: {
				id: 'gridBoxed',
				text: 'Boxed Grid',
				path: `${subDir}grid-pages/boxed`,
				icon: 'ViewArray',
			},
			gridFluid: {
				id: 'gridFluid',
				text: 'Fluid Grid',
				path: `${subDir}grid-pages/fluid`,
				icon: 'ViewDay',
			},
		},
	},
	editPages: {
		id: 'editPages',
		text: 'Edit Pages',
		path: `${subDir}edit-pages`,
		icon: 'drive_file_rename_outline ',
		subMenu: {
			editModern: {
				id: 'editModern',
				text: 'Modern Edit',
				path: `${subDir}edit-pages/modern`,
				icon: 'AutoAwesomeMosaic',
				notification: 'primary',
			},
			editBoxed: {
				id: 'editBoxed',
				text: 'Boxed Edit',
				path: `${subDir}edit-pages/boxed`,
				icon: 'ViewArray',
			},
			editFluid: {
				id: 'editFluid',
				text: 'Fluid Edit',
				path: `${subDir}edit-pages/fluid`,
				icon: 'ViewDay',
			},
			editWizard: {
				id: 'editWizard',
				text: 'Wizard Edit',
				path: `${subDir}edit-pages/wizard`,
				icon: 'LinearScale',
			},
			editInCanvas: {
				id: 'editInCanvas',
				text: 'In Canvas Edit',
				path: `${subDir}edit-pages/in-canvas`,
				icon: 'VerticalSplit',
			},
			editInModal: {
				id: 'editInModal',
				text: 'In Modal Edit',
				path: `${subDir}edit-pages/in-modal`,
				icon: 'PictureInPicture',
			},
		},
	},
	pricingTable: {
		id: 'pricingTable',
		text: 'Pricing Table',
		path: `${subDir}pricing-table`,
		icon: 'Local Offer',
	},

	auth: {
		id: 'auth',
		text: 'Auth Pages',
		icon: 'Extension',
	},
	login: {
		id: 'login',
		text: 'Login',
		path: `${subDir}auth-pages/login`,
		icon: 'Login',
	},
	signUp: {
		id: 'signUp',
		text: 'Sign Up',
		path: `${subDir}auth-pages/sign-up`,
		icon: 'PersonAdd',
	},

	page404: {
		id: 'Page404',
		text: '404 Page',
		path: `${subDir}auth-pages/404`,
		icon: 'ReportGmailerrorred',
	},

	app: {
		id: 'app',
		text: 'Apps',
		icon: 'Extension',
	},
	projectManagement: {
		id: 'projectManagement',
		text: 'Project Management',
		path: `${subDir}project-management`,
		icon: 'AutoStories',
		subMenu: {
			list: {
				id: 'list',
				text: 'Projects',
				path: `${subDir}project-management/list`,
				icon: 'AutoStories',
			},
			itemID: {
				id: 'projectID',
				text: 'projectID',
				path: `${subDir}project-management/project`,
				hide: true,
			},
			item: {
				id: 'item',
				text: 'Project',
				path: `${subDir}project-management/project/1`,
				icon: 'Book',
			},
		},
	},
	knowledge: {
		id: 'knowledge',
		text: 'Knowledge',
		path: `${subDir}knowledge`,
		icon: 'AutoStories',
		subMenu: {
			grid: {
				id: 'grid',
				text: 'Knowledge Grid',
				path: `${subDir}knowledge/grid`,
				icon: 'AutoStories',
			},
			itemID: {
				id: 'itemID',
				text: 'itemID',
				path: `${subDir}knowledge/item`,
				hide: true,
			},
			item: {
				id: 'item',
				text: 'Item',
				path: `${subDir}knowledge/item/1`,
				icon: 'Book',
			},
		},
	},
	sales: {
		id: 'sales',
		text: 'Sales',
		path: `${subDir}sales`,
		icon: 'Store',
		subMenu: {
			dashboard: dashboardMenu.dashboard,
			salesList: {
				id: 'products',
				text: 'Sales List',
				path: `${subDir}sales/sales-list`,
				icon: 'FactCheck',
			},
			productsGrid: {
				id: 'productsGrid',
				text: 'Products Grid',
				path: `${subDir}sales/grid`,
				icon: 'CalendarViewMonth',
			},
			productID: {
				id: 'productID',
				text: 'productID',
				path: `${subDir}sales/product`,
				hide: true,
			},
			product: {
				id: 'product',
				text: 'Product',
				path: `${subDir}sales/product/1`,
				icon: 'QrCode2',
			},
			transactions: {
				id: 'transactions',
				text: 'Transactions',
				path: `${subDir}sales/transactions`,
				icon: 'PublishedWithChanges',
			},
		},
	},
	appointment: {
		id: 'appointment',
		text: 'Appointment',
		path: `${subDir}appointment`,
		icon: 'Today',
		subMenu: {
			dashboard: dashboardMenu.dashboardBooking,
			calendar: {
				id: 'calendar',
				text: 'Calendar',
				path: `${subDir}appointment/calendar`,
				icon: 'EditCalendar',
				notification: true,
			},
			employeeList: {
				id: 'employeeList',
				text: 'Employee List',
				path: `${subDir}appointment/employee-list`,
				icon: 'PersonSearch',
			},
			employeeID: {
				id: 'employeeID',
				text: 'employeeID',
				path: `${subDir}appointment/employee`,
				hide: true,
			},
			employee: {
				id: 'employee',
				text: 'Employee',
				path: `${subDir}appointment/employee/1`,
				icon: 'QrCode2',
			},
			appointmentList: {
				id: 'appointmentList',
				text: 'Appointment List',
				path: `${subDir}appointment/appointment-list`,
				icon: 'Event',
			},
		},
	},
	crm: {
		id: 'crm',
		text: 'CRM',
		path: `${subDir}crm`,
		icon: 'Contacts',
		subMenu: {
			dashboard: {
				id: 'dashboard',
				text: 'CRM Dashboard',
				path: `${subDir}crm/dashboard`,
				icon: 'RecentActors',
			},
			customersList: {
				id: 'customersList',
				text: 'Customers',
				path: `${subDir}crm/customers`,
				icon: 'PersonSearch',
			},
			customerID: {
				id: 'customerID',
				text: 'customerID',
				path: `${subDir}crm/customer`,
				hide: true,
			},
			customer: {
				id: 'customer',
				text: 'Customer',
				path: `${subDir}crm/customer/1`,
				icon: 'Badge',
			},
			sales: {
				id: 'sales',
				text: 'Sales',
				path: `${subDir}crm/sales`,
				icon: 'Storefront',
			},
			invoiceID: {
				id: 'invoiceID',
				text: 'invoiceID',
				path: `${subDir}crm/invoice`,
				hide: true,
			},
			invoice: {
				id: 'invoice',
				text: 'Invoice',
				path: `${subDir}crm/invoice/1`,
				icon: 'Receipt',
			},
		},
	},
	chat: {
		id: 'chat',
		text: 'Chat',
		path: `${subDir}chat`,
		icon: 'Forum',
		subMenu: {
			withListChat: {
				id: 'withListChat',
				text: 'With List',
				path: `${subDir}chat/with-list`,
				icon: 'Quickreply',
			},
			onlyListChat: {
				id: 'onlyListChat',
				text: 'Only List',
				path: `${subDir}chat/only-list`,
				icon: 'Dns',
			},
		},
	},
};

export const layoutMenu = {
	layoutTypes: {
		id: 'layoutTypes',
		text: 'Page Layout Types',
	},
	blank: {
		id: 'blank',
		text: 'Blank',
		path: `${subDir}page-layouts/blank`,
		icon: 'check_box_outline_blank ',
	},
	pageLayout: {
		id: 'pageLayout',
		text: 'Page Layout',
		path: `${subDir}page-layouts`,
		icon: 'BackupTable',
		subMenu: {
			headerAndSubheader: {
				id: 'headerAndSubheader',
				text: 'Header & Subheader',
				path: `${subDir}page-layouts/header-and-subheader`,
				icon: 'ViewAgenda',
			},
			onlyHeader: {
				id: 'onlyHeader',
				text: 'Only Header',
				path: `${subDir}page-layouts/only-header`,
				icon: 'ViewStream',
			},
			onlySubheader: {
				id: 'onlySubheader',
				text: 'Only Subheader',
				path: `${subDir}page-layouts/only-subheader`,
				icon: 'ViewStream',
			},
			onlyContent: {
				id: 'onlyContent',
				text: 'Only Content',
				path: `${subDir}page-layouts/only-content`,
				icon: 'WebAsset',
			},
		},
	},
	asideTypes: {
		id: 'asideTypes',
		text: 'Aside Types',
		path: `${subDir}aside-types`,
		icon: 'Vertical Split',
		subMenu: {
			defaultAside: {
				id: 'defaultAside',
				text: 'Default Aside',
				path: `${subDir}aside-types/default-aside`,
				icon: 'ViewQuilt',
			},
			minimizeAside: {
				id: 'minimizeAside',
				text: 'Minimize Aside',
				path: `${subDir}aside-types/minimize-aside`,
				icon: 'View Compact',
			},
		},
	},
};

export const componentsMenu = {
	bootstrap: {
		id: 'bootstrap',
		text: 'Bootstrap',
		icon: 'Extension',
	},
	content: {
		id: 'content',
		text: 'Content',
		path: `${subDir}content`,
		icon: 'format_size',
		subMenu: {
			typography: {
				id: 'typography',
				text: 'Typography',
				path: `${subDir}content/typography`,
				icon: 'text_fields',
			},
			images: {
				id: 'images',
				text: 'Images',
				path: `${subDir}content/images`,
				icon: 'Image ',
			},
			tables: {
				id: 'tables',
				text: 'Tables',
				path: `${subDir}content/tables`,
				icon: 'table_chart',
			},
			figures: {
				id: 'figures',
				text: 'Figures',
				path: `${subDir}content/figures`,
				icon: 'Photo Library ',
			},
		},
	},
	forms: {
		id: 'forms',
		text: 'Forms',
		path: `${subDir}forms`,
		icon: 'CheckBox',
		notification: 'success',
		subMenu: {
			formGroup: {
				id: 'formGroup',
				text: 'Form Group',
				path: `${subDir}forms/form-group`,
				icon: 'Source',
			},
			formControl: {
				id: 'formControl',
				text: 'Form Controls',
				path: `${subDir}forms/form-controls`,
				icon: 'Create',
			},
			select: {
				id: 'select',
				text: 'Select',
				path: `${subDir}forms/select`,
				icon: 'Checklist',
			},
			checksAndRadio: {
				id: 'checksAndRadio',
				text: 'Checks & Radio',
				path: `${subDir}forms/checks-and-radio`,
				icon: 'CheckBox',
			},
			range: {
				id: 'range',
				text: 'Range',
				path: `${subDir}forms/range`,
				icon: 'HdrStrong',
			},
			inputGroup: {
				id: 'inputGroup',
				text: 'Input Group',
				path: `${subDir}forms/input-group`,
				icon: 'PowerInput',
			},
			validation: {
				id: 'validation',
				text: 'Validation',
				path: `${subDir}forms/validation`,
				icon: 'VerifiedUser',
			},
			wizard: {
				id: 'wizard',
				text: 'Wizard',
				path: `${subDir}forms/wizard`,
				icon: 'LinearScale',
			},
		},
	},
	components: {
		id: 'components',
		text: 'Component',
		path: `${subDir}components`,
		icon: 'Extension',
		notification: 'success',
		subMenu: {
			accordion: {
				id: 'accordion',
				text: 'Accordion',
				path: `${subDir}components/accordion`,
				icon: 'ViewDay',
			},
			alert: {
				id: 'alert',
				text: 'Alert',
				path: `${subDir}components/alert`,
				icon: 'Announcement',
			},
			badge: {
				id: 'badge',
				text: 'Badge',
				path: `${subDir}components/badge`,
				icon: 'Vibration',
			},
			breadcrumb: {
				id: 'breadcrumb',
				text: 'Breadcrumb',
				path: `${subDir}components/breadcrumb`,
				icon: 'AddRoad',
			},
			button: {
				id: 'button',
				text: 'Button',
				path: `${subDir}components/button`,
				icon: 'SmartButton',
			},
			buttonGroup: {
				id: 'buttonGroup',
				text: 'Button Group',
				path: `${subDir}components/button-group`,
				icon: 'Splitscreen',
			},
			card: {
				id: 'card',
				text: 'Card',
				path: `${subDir}components/card`,
				icon: 'Crop32',
			},
			carousel: {
				id: 'carousel',
				text: 'Carousel',
				path: `${subDir}components/carousel`,
				icon: 'RecentActors',
			},
			// Close
			collapse: {
				id: 'collapse',
				text: 'Collapse',
				path: `${subDir}components/collapse`,
				icon: 'UnfoldLess',
			},
			dropdowns: {
				id: 'dropdowns',
				text: 'Dropdowns',
				path: `${subDir}components/dropdowns`,
				icon: 'Inventory',
			},
			listGroup: {
				id: 'listGroup',
				text: 'List Group',
				path: `${subDir}components/list-group`,
				icon: 'ListAlt',
			},
			modal: {
				id: 'modal',
				text: 'Modal',
				path: `${subDir}components/modal`,
				icon: 'PictureInPicture',
			},
			navsTabs: {
				id: 'navsTabs',
				text: 'Navs & Tabs',
				path: `${subDir}components/navs-and-tabs`,
				icon: 'PivotTableChart',
			},
			// Navbar
			offcanvas: {
				id: 'offcanvas',
				text: 'Offcanvas',
				path: `${subDir}components/offcanvas`,
				icon: 'VerticalSplit',
			},
			pagination: {
				id: 'pagination',
				text: 'Pagination',
				path: `${subDir}components/pagination`,
				icon: 'Money',
			},
			popovers: {
				id: 'popovers',
				text: 'Popovers',
				path: `${subDir}components/popovers`,
				icon: 'Assistant',
			},
			progress: {
				id: 'progress',
				text: 'Progress',
				path: `${subDir}components/progress`,
				icon: 'HourglassTop',
			},
			scrollspy: {
				id: 'scrollspy',
				text: 'Scrollspy',
				path: `${subDir}components/scrollspy`,
				icon: 'KeyboardHide',
			},
			spinners: {
				id: 'spinners',
				text: 'Spinners',
				path: `${subDir}components/spinners`,
				icon: 'RotateRight',
			},
			table: {
				id: 'table',
				text: 'Table',
				path: `${subDir}components/table`,
				icon: 'TableChart',
			},
			toasts: {
				id: 'toasts',
				text: 'Toasts',
				path: `${subDir}components/toasts`,
				icon: 'RotateRight',
			},
			tooltip: {
				id: 'tooltip',
				text: 'Tooltip',
				path: `${subDir}components/tooltip`,
				icon: 'Assistant',
			},
		},
	},
	utilities: {
		id: 'utilities',
		text: 'Utilities',
		path: `${subDir}utilities`,
		icon: 'Support',
		subMenu: {
			api: {
				id: 'api',
				text: 'API',
				path: `${subDir}utilities/api`,
				icon: 'Api',
			},
			background: {
				id: 'background',
				text: 'Background',
				path: `${subDir}utilities/background`,
				icon: 'FormatColorFill',
			},
			borders: {
				id: 'borders',
				text: 'Borders',
				path: `${subDir}utilities/borders`,
				icon: 'BorderStyle',
			},
			colors: {
				id: 'colors',
				text: 'Colors',
				path: `${subDir}utilities/colors`,
				icon: 'InvertColors',
			},
			display: {
				id: 'display',
				text: 'Display',
				path: `${subDir}utilities/display`,
				icon: 'LaptopMac',
			},
			flex: {
				id: 'flex',
				text: 'Flex',
				path: `${subDir}utilities/flex`,
				icon: 'SettingsOverscan',
			},
			float: {
				id: 'float',
				text: 'Float',
				path: `${subDir}utilities/float`,
				icon: 'ViewArray',
			},
			interactions: {
				id: 'interactions',
				text: 'Interactions',
				path: `${subDir}utilities/interactions`,
				icon: 'Mouse',
			},
			overflow: {
				id: 'overflow',
				text: 'Overflow',
				path: `${subDir}utilities/overflow`,
				icon: 'TableRows',
			},
			position: {
				id: 'position',
				text: 'Position',
				path: `${subDir}utilities/position`,
				icon: 'Adjust',
			},
			shadows: {
				id: 'shadows',
				text: 'Shadows',
				path: `${subDir}utilities/shadows`,
				icon: 'ContentCopy',
			},
			sizing: {
				id: 'sizing',
				text: 'Sizing',
				path: `${subDir}utilities/sizing`,
				icon: 'Straighten',
			},
			spacing: {
				id: 'spacing',
				text: 'Spacing',
				path: `${subDir}utilities/spacing`,
				icon: 'SpaceBar',
			},
			text: {
				id: 'text',
				text: 'Text',
				path: `${subDir}utilities/text`,
				icon: 'TextFields',
			},
			verticalAlign: {
				id: 'vertical-align',
				text: 'Vertical Align',
				path: `${subDir}utilities/vertical-align`,
				icon: 'VerticalAlignCenter',
			},
			visibility: {
				id: 'visibility',
				text: 'Visibility',
				path: `${subDir}utilities/visibility`,
				icon: 'Visibility',
			},
		},
	},
	extra: {
		id: 'extra',
		text: 'Extra Library',
		icon: 'Extension',
	},
	icons: {
		id: 'icons',
		text: 'Icons',
		path: `${subDir}icons`,
		icon: 'Grain',
		notification: 'success',
		subMenu: {
			icon: {
				id: 'icon',
				text: 'Icon',
				path: `${subDir}icons/icon`,
				icon: 'Lightbulb',
			},
			material: {
				id: 'material',
				text: 'Material',
				path: `${subDir}icons/material`,
				icon: 'Verified',
			},
			bootstrapIcon: {
				id: 'bootstrapIcon',
				text: 'Bootstrap Icon',
				path: `${subDir}icons/bootstrap-icon`,
				icon: 'BootstrapFill',
			},
		},
	},
	charts: {
		id: 'charts',
		text: 'Charts',
		path: `${subDir}charts`,
		icon: 'AreaChart',
		notification: 'success',
		subMenu: {
			chartsUsage: {
				id: 'chartsUsage',
				text: 'General Usage',
				path: `${subDir}charts/general-usage`,
				icon: 'Description',
			},
			chartsSparkline: {
				id: 'chartsSparkline',
				text: 'Sparkline',
				path: `${subDir}charts/sparkline`,
				icon: 'AddChart',
			},
			chartsLine: {
				id: 'chartsLine',
				text: 'Line',
				path: `${subDir}charts/line`,
				icon: 'ShowChart',
			},
			chartsArea: {
				id: 'chartsArea',
				text: 'Area',
				path: `${subDir}charts/area`,
				icon: 'AreaChart',
			},
			chartsColumn: {
				id: 'chartsColumn',
				text: 'Column',
				path: `${subDir}charts/column`,
				icon: 'BarChart',
			},
			chartsBar: {
				id: 'chartsBar',
				text: 'Bar',
				path: `${subDir}charts/bar`,
				icon: 'StackedBarChart',
			},
			chartsMixed: {
				id: 'chartsMixed',
				text: 'Mixed',
				path: `${subDir}charts/mixed`,
				icon: 'MultilineChart',
			},
			chartsTimeline: {
				id: 'chartsTimeline',
				text: 'Timeline',
				path: `${subDir}charts/timeline`,
				icon: 'WaterfallChart',
			},
			chartsCandleStick: {
				id: 'chartsCandleStick',
				text: 'Candlestick',
				path: `${subDir}charts/candlestick`,
				icon: 'Cake',
			},
			chartsBoxWhisker: {
				id: 'chartsBoxWhisker',
				text: 'Box Whisker',
				path: `${subDir}charts/box-whisker`,
				icon: 'SportsMma',
			},
			chartsPieDonut: {
				id: 'chartsPieDonut',
				text: 'Pie & Donut',
				path: `${subDir}charts/pie-donut`,
				icon: 'PieChart',
			},
			chartsRadar: {
				id: 'chartsRadar',
				text: 'Radar',
				path: `${subDir}charts/radar`,
				icon: 'BrightnessLow',
			},
			chartsPolar: {
				id: 'chartsPolar',
				text: 'Polar',
				path: `${subDir}charts/polar`,
				icon: 'TrackChanges',
			},
			chartsRadialBar: {
				id: 'chartsRadialBar',
				text: 'Radial Bar',
				path: `${subDir}charts/radial-bar`,
				icon: 'DonutLarge',
			},
			chartsBubble: {
				id: 'chartsBubble',
				text: 'Bubble',
				path: `${subDir}charts/bubble`,
				icon: 'BubbleChart',
			},
			chartsScatter: {
				id: 'chartsScatter',
				text: 'Scatter',
				path: `${subDir}charts/scatter`,
				icon: 'ScatterPlot',
			},
			chartsHeatMap: {
				id: 'chartsHeatMap',
				text: 'Heat Map',
				path: `${subDir}charts/heat-map`,
				icon: 'GridOn',
			},
			chartsTreeMap: {
				id: 'chartsTreeMap',
				text: 'Tree Map',
				path: `${subDir}charts/tree-map`,
				icon: 'AccountTree',
			},
		},
	},
	notification: {
		id: 'notification',
		text: 'Notification',
		path: `${subDir}notifications`,
		icon: 'NotificationsNone',
	},
	hooks: {
		id: 'hooks',
		text: 'Hooks',
		path: `${subDir}hooks`,
		icon: 'Anchor',
	},
};

export const productsMenu = {
	companyA: {
		id: 'companyA',
		text: 'Company A',
		path: `${subDir}grid-pages/products`,
		subMenu: null,
	},
	companyB: { id: 'companyB', text: 'Company B', path: `${subDir}/`, subMenu: null },
	companyC: { id: 'companyC', text: 'Company C', path: `${subDir}/`, subMenu: null },
	companyD: { id: 'companyD', text: 'Company D', path: `${subDir}/`, subMenu: null },
};
