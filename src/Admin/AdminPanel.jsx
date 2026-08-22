import React, { useEffect, useMemo, useState } from "react";

/* ============================================================
   API
============================================================ */

const API_BASE = "http://localhost:5000/api";

/* ============================================================
   HELPERS
============================================================ */

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("userToken") ||
    localStorage.getItem("accessToken") ||
    ""
  );
};

const apiRequest = async (url, options = {}) => {
  const token = getToken();

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...(options.headers || {}),
    },
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed with status ${response.status}`
    );
  }

  return data;
};

const formatPrice = (value) => {
  const number = Number(value || 0);

  return number.toLocaleString("en-PK", {
    maximumFractionDigits: 0,
  });
};

const formatDate = (date) => {
  if (!date) return "N/A";

  try {
    return new Date(date).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
};

const formatDateTime = (date) => {
  if (!date) return "N/A";

  try {
    return new Date(date).toLocaleString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "N/A";
  }
};

const normalizeRole = (role) => {
  if (!role) return "user";
  return String(role).toLowerCase();
};

// Local placeholder (no network request, avoids flicker) — a simple grey box with an icon
const NO_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50'>
      <rect width='50' height='50' rx='6' fill='#eeeeec'/>
      <path d='M14 32l6-8 5 6 4-5 7 7' stroke='#b7bcbe' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/>
      <circle cx='19' cy='18' r='3' fill='#b7bcbe'/>
    </svg>`
  );

// Resolve product image URL — handles both full URLs and backend-relative paths
const getProductImageUrl = (product) => {
  const url = product?.image_url;

  if (!url) {
    return NO_IMAGE_PLACEHOLDER;
  }

  if (String(url).startsWith("http")) {
    return url;
  }

  return `http://localhost:5000${url}`;
};

/* ============================================================
   MAIN ADMIN PANEL
============================================================ */

const AdminPanel = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [admins, setAdmins] = useState([]);

  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [loadingAdmins, setLoadingAdmins] = useState(false);

  const [error, setError] = useState("");

  const [searchOrders, setSearchOrders] = useState("");
  const [searchProducts, setSearchProducts] = useState("");
  const [searchCustomers, setSearchCustomers] = useState("");
  const [searchAdmins, setSearchAdmins] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [savingAdmin, setSavingAdmin] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "Women",
    stock: "20",
  });

  const [savingProduct, setSavingProduct] = useState(false);
  const [productImageFile, setProductImageFile] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState(null);

  /* ============================================================
     LOAD ORDERS
  ============================================================ */

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      setError("");

      const data = await apiRequest("/admin/orders");

      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  /* ============================================================
     LOAD PRODUCTS
  ============================================================ */

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      setError("");

      const data = await apiRequest("/admin/products");

      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to load products");
    } finally {
      setLoadingProducts(false);
    }
  };

  /* ============================================================
     LOAD CUSTOMERS
  ============================================================ */

  const fetchCustomers = async () => {
    try {
      setLoadingCustomers(true);
      setError("");

      const data = await apiRequest("/admin/customers");

      const allUsers = data.customers || [];

      const onlyCustomers = allUsers.filter(
        (user) => normalizeRole(user.role) !== "admin"
      );

      setCustomers(onlyCustomers);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to load customers");
    } finally {
      setLoadingCustomers(false);
    }
  };

  /* ============================================================
     LOAD ADMINS
  ============================================================ */

  const fetchAdmins = async () => {
    try {
      setLoadingAdmins(true);
      setError("");

      const data = await apiRequest("/admin/admins");
      setAdmins(data.admins || []);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to load admins");
    } finally {
      setLoadingAdmins(false);
    }
  };

  /* ============================================================
     INITIAL LOAD
  ============================================================ */

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchCustomers();
    fetchAdmins();
  }, []);

  /* ============================================================
     REFRESH ALL
  ============================================================ */

  const refreshAll = async () => {
    setError("");

    await Promise.all([
      fetchOrders(),
      fetchProducts(),
      fetchCustomers(),
      fetchAdmins(),
    ]);
  };

  /* ============================================================
     ADMIN MANAGEMENT
  ============================================================ */

  const openCustomerEditor = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const closeCustomerEditor = () => {
    setSelectedCustomer(null);
    setShowCustomerModal(false);
  };

  const makeCustomerAdmin = async (customerId) => {
    const confirmed = window.confirm(
      "Make this customer an admin? They will be moved from Customers to Admins."
    );

    if (!confirmed) return;

    try {
      const data = await apiRequest(`/admin/users/${customerId}/role`, {
        method: "PUT",
        body: JSON.stringify({ role: "admin" }),
      });

      const updatedUser = data.user;

      setCustomers((previous) =>
        previous.filter((customer) => customer.id !== customerId)
      );

      if (updatedUser) {
        setAdmins((previous) => [updatedUser, ...previous]);
      }

      closeCustomerEditor();
      alert("Customer is now an admin successfully.");
    } catch (error) {
      alert(error.message || "Failed to make customer admin");
    }
  };

  const resetAdminForm = () => {
    setAdminForm({
      name: "",
      email: "",
      password: "",
    });
  };

  const saveAdmin = async (event) => {
    event.preventDefault();

    const name = adminForm.name.trim();
    const email = adminForm.email.trim().toLowerCase();
    const password = adminForm.password;

    if (!name) {
      alert("Admin name is required");
      return;
    }

    if (!email) {
      alert("Admin email is required");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setSavingAdmin(true);

      const data = await apiRequest("/admin/admins", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (data.admin) {
        setAdmins((previous) => [data.admin, ...previous]);
      }

      setShowAdminModal(false);
      resetAdminForm();
      alert("New admin created successfully.");
    } catch (error) {
      alert(error.message || "Failed to create admin");
    } finally {
      setSavingAdmin(false);
    }
  };

  /* ============================================================
     ORDER STATUS
  ============================================================ */

  const updateOrderStatus = async (orderId, status) => {
    try {
      await apiRequest(`/admin/orders/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify({
          status,
        }),
      });

      setOrders((previous) =>
        previous.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (error) {
      alert(error.message || "Failed to update order");
    }
  };

  /* ============================================================
     DELETE ORDER
  ============================================================ */

  const deleteOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) return;

    try {
      await apiRequest(`/admin/orders/${orderId}`, {
        method: "DELETE",
      });

      setOrders((previous) =>
        previous.filter((order) => order.id !== orderId)
      );

      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
        setOrderItems([]);
      }
    } catch (error) {
      alert(error.message || "Failed to delete order");
    }
  };

  /* ============================================================
     ORDER DETAILS
  ============================================================ */

  const openOrderDetails = async (orderId) => {
    try {
      const data = await apiRequest(`/admin/orders/${orderId}`);

      setSelectedOrder(data.order || null);
      setOrderItems(data.items || []);
    } catch (error) {
      alert(error.message || "Failed to load order details");
    }
  };

  /* ============================================================
     PRODUCT FORM
  ============================================================ */

  const resetProductForm = () => {
    setProductForm({
      title: "",
      description: "",
      price: "",
      category: "Women",
      stock: "20",
    });

    setEditingProduct(null);
    setProductImageFile(null);
    setProductImagePreview(null);
  };

  const openAddProduct = () => {
    resetProductForm();
    setShowProductModal(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);

    setProductForm({
      title: product.title || "",
      description: product.description || "",
      price: product.price ?? "",
      category: product.category || "Women",
      stock: product.stock ?? 0,
    });

    setProductImageFile(null);
    setProductImagePreview(getProductImageUrl(product));

    setShowProductModal(true);
  };

  const handleProductImageChange = (file) => {
    if (!file) {
      setProductImageFile(null);
      return;
    }

    setProductImageFile(file);
    setProductImagePreview(URL.createObjectURL(file));
  };

  /* ============================================================
     PRODUCT INPUT
  ============================================================ */

  const handleProductChange = (field, value) => {
    setProductForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* ============================================================
     SAVE PRODUCT
  ============================================================ */

  const saveProduct = async (event) => {
    event.preventDefault();

    if (!productForm.title.trim()) {
      alert("Product title is required");
      return;
    }

    if (productForm.price === "") {
      alert("Product price is required");
      return;
    }

    if (!productForm.category) {
      alert("Product category is required");
      return;
    }

    try {
      setSavingProduct(true);

      const formData = new FormData();
      formData.append("title", productForm.title.trim());
      formData.append("description", productForm.description.trim());
      formData.append("price", Number(productForm.price));
      formData.append("category", productForm.category);
      formData.append("stock", Number(productForm.stock || 0));

      if (productImageFile) {
        formData.append("image", productImageFile);
      }

      const token = getToken();
      const url = editingProduct
        ? `${API_BASE}/admin/products/${editingProduct.id}`
        : `${API_BASE}/admin/products`;

      const response = await fetch(url, {
        method: editingProduct ? "PUT" : "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          // NOTE: Do NOT set Content-Type manually — the browser sets the
          // correct multipart boundary automatically for FormData.
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save product");
      }

      const savedProduct = data.product || {
        ...productForm,
        id: editingProduct?.id,
      };

      if (editingProduct) {
        setProducts((previous) =>
          previous.map((product) =>
            product.id === editingProduct.id ? savedProduct : product
          )
        );
      } else {
        setProducts((previous) => [savedProduct, ...previous]);
      }

      setShowProductModal(false);
      resetProductForm();
    } catch (error) {
      alert(error.message || "Failed to save product");
    } finally {
      setSavingProduct(false);
    }
  };

  /* ============================================================
     DELETE PRODUCT
  ============================================================ */

  const deleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await apiRequest(`/admin/products/${productId}`, {
        method: "DELETE",
      });

      setProducts((previous) =>
        previous.filter((product) => product.id !== productId)
      );
    } catch (error) {
      alert(error.message || "Failed to delete product");
    }
  };

  /* ============================================================
     FILTERED ORDERS
  ============================================================ */

  const filteredOrders = useMemo(() => {
    const search = searchOrders.trim().toLowerCase();

    if (!search) return orders;

    return orders.filter((order) => {
      return (
        String(order.id).includes(search) ||
        String(order.customer_name || "")
          .toLowerCase()
          .includes(search) ||
        String(order.customer_email || "")
          .toLowerCase()
          .includes(search) ||
        String(order.status || "")
          .toLowerCase()
          .includes(search)
      );
    });
  }, [orders, searchOrders]);

  /* ============================================================
     FILTERED PRODUCTS
  ============================================================ */

  const filteredProducts = useMemo(() => {
    const search = searchProducts.trim().toLowerCase();

    if (!search) return products;

    return products.filter((product) => {
      return (
        String(product.title || "")
          .toLowerCase()
          .includes(search) ||
        String(product.category || "")
          .toLowerCase()
          .includes(search)
      );
    });
  }, [products, searchProducts]);

  /* ============================================================
     FILTERED CUSTOMERS
  ============================================================ */

  const filteredCustomers = useMemo(() => {
    const search = searchCustomers.trim().toLowerCase();

    if (!search) return customers;

    return customers.filter((customer) => {
      return (
        String(customer.id || "")
          .toLowerCase()
          .includes(search) ||
        String(customer.name || "")
          .toLowerCase()
          .includes(search) ||
        String(customer.email || "")
          .toLowerCase()
          .includes(search) ||
        String(customer.phone || "")
          .toLowerCase()
          .includes(search) ||
        String(customer.address || "")
          .toLowerCase()
          .includes(search)
      );
    });
  }, [customers, searchCustomers]);

  /* ============================================================
     FILTERED ADMINS
  ============================================================ */

  const filteredAdmins = useMemo(() => {
    const search = searchAdmins.trim().toLowerCase();

    if (!search) return admins;

    return admins.filter((admin) => {
      return (
        String(admin.id || "").includes(search) ||
        String(admin.name || "").toLowerCase().includes(search) ||
        String(admin.email || "").toLowerCase().includes(search)
      );
    });
  }, [admins, searchAdmins]);

  /* ============================================================
     DASHBOARD STATS
  ============================================================ */

  const totalRevenue = useMemo(() => {
    return orders.reduce(
      (total, order) =>
        total + Number(order.total_amount || 0),
      0
    );
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        String(order.status).toLowerCase() === "pending"
    ).length;
  }, [orders]);

  const processingOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        String(order.status).toLowerCase() === "processing"
    ).length;
  }, [orders]);

  const deliveredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        String(order.status).toLowerCase() === "delivered"
    ).length;
  }, [orders]);

  /* ============================================================
     NAVIGATION
  ============================================================ */

  const navigatePage = (page) => {
    setActivePage(page);
    setError("");
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}

      <aside
        className="admin-sidebar"
        style={styles.sidebar}
      >
        <div
          className="admin-sidebar-inner"
          style={styles.sidebarInner}
        >
          <div
            className="admin-brand"
            style={styles.brand}
          >
            <img
              src="/logo_big.png"
              alt="Vestro X"
              style={styles.brandLogo}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <div>
              <strong
                className="admin-brand-name"
                style={styles.brandName}
              >
                VESTRO X
              </strong>

              <span
                className="admin-brand-sub"
                style={styles.brandSub}
              >
                ADMIN PANEL
              </span>
            </div>
          </div>

          <nav
            className="admin-sidebar-nav"
            style={styles.sidebarNav}
          >
            <NavButton
              active={activePage === "dashboard"}
              icon={<DashboardIcon size={19} />}
              label="Dashboard"
              onClick={() => navigatePage("dashboard")}
            />

            <NavButton
              active={activePage === "orders"}
              icon={<OrdersIcon size={19} />}
              label="Orders"
              onClick={() => navigatePage("orders")}
            />

            <NavButton
              active={activePage === "products"}
              icon={<ProductsIcon size={19} />}
              label="Products"
              onClick={() => navigatePage("products")}
            />

            <NavButton
              active={activePage === "customers"}
              icon={<UsersIcon size={19} />}
              label="Customers"
              onClick={() => navigatePage("customers")}
            />

            <NavButton
              active={activePage === "admins"}
              icon={<AdminIcon size={19} />}
              label="Admins"
              onClick={() => navigatePage("admins")}
            />
          </nav>

          <div
            className="admin-sidebar-bottom"
            style={styles.sidebarBottom}
          >
            © 2026 Vestro X
            <br />
            <span>All rights reserved.</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}

      <main
        className="admin-main"
        style={styles.main}
      >
        {/* TOPBAR */}

        <header
          className="admin-topbar"
          style={styles.topbar}
        >
          <div>
            <p style={styles.topEyebrow}>VESTRO X</p>

            <h1
              className="admin-topbar-title"
              style={styles.topTitle}
            >
              {activePage === "dashboard"
                ? "Dashboard"
                : activePage === "orders"
                ? "Order Management"
                : activePage === "products"
                ? "Product Inventory"
                : activePage === "customers"
                ? "Customer Management"
                : "Admin Management"}
            </h1>
          </div>

          <div style={styles.adminArea}>
            <button
              style={styles.refreshButton}
              onClick={refreshAll}
            >
              <RefreshIcon size={15} />

              <span className="admin-refresh-text">
                Refresh
              </span>
            </button>

            <div
              className="admin-admin-info"
              style={styles.adminInfo}
            >
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>

            <div style={styles.adminAvatar}>A</div>
          </div>
        </header>

        {/* CONTENT */}

        <section
          className="admin-content"
          style={styles.content}
        >
          {error && (
            <div style={styles.errorBox}>
              <span>{error}</span>

              <button
                style={styles.errorClose}
                onClick={() => setError("")}
              >
                ×
              </button>
            </div>
          )}

          {activePage === "dashboard" && (
            <Dashboard
              orders={orders}
              products={products}
              customers={customers}
              totalRevenue={totalRevenue}
              pendingOrders={pendingOrders}
              processingOrders={processingOrders}
              deliveredOrders={deliveredOrders}
              onOrders={() => navigatePage("orders")}
              onProducts={() => navigatePage("products")}
              onCustomers={() => navigatePage("customers")}
            />
          )}

          {activePage === "orders" && (
            <OrdersPage
              orders={filteredOrders}
              search={searchOrders}
              setSearch={setSearchOrders}
              loading={loadingOrders}
              refresh={fetchOrders}
              onDetails={openOrderDetails}
              onStatusChange={updateOrderStatus}
              onDelete={deleteOrder}
            />
          )}

          {activePage === "products" && (
            <ProductsPage
              products={filteredProducts}
              search={searchProducts}
              setSearch={setSearchProducts}
              loading={loadingProducts}
              refresh={fetchProducts}
              onAdd={openAddProduct}
              onEdit={openEditProduct}
              onDelete={deleteProduct}
            />
          )}

          {activePage === "customers" && (
            <CustomersPage
              customers={filteredCustomers}
              search={searchCustomers}
              setSearch={setSearchCustomers}
              loading={loadingCustomers}
              refresh={fetchCustomers}
              onEdit={openCustomerEditor}
            />
          )}

          {activePage === "admins" && (
            <AdminsPage
              admins={filteredAdmins}
              search={searchAdmins}
              setSearch={setSearchAdmins}
              loading={loadingAdmins}
              refresh={fetchAdmins}
              onAdd={() => {
                resetAdminForm();
                setShowAdminModal(true);
              }}
            />
          )}
        </section>
      </main>

      {/* ORDER MODAL */}

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          items={orderItems}
          onClose={() => {
            setSelectedOrder(null);
            setOrderItems([]);
          }}
        />
      )}

      {/* CUSTOMER EDIT MODAL */}

      {showCustomerModal && selectedCustomer && (
        <CustomerEditModal
          customer={selectedCustomer}
          onClose={closeCustomerEditor}
          onMakeAdmin={() =>
            makeCustomerAdmin(selectedCustomer.id)
          }
        />
      )}

      {/* ADMIN CREATE MODAL */}

      {showAdminModal && (
        <AdminCreateModal
          form={adminForm}
          saving={savingAdmin}
          onChange={(field, value) =>
            setAdminForm((previous) => ({
              ...previous,
              [field]: value,
            }))
          }
          onSubmit={saveAdmin}
          onClose={() => {
            setShowAdminModal(false);
            resetAdminForm();
          }}
        />
      )}

      {/* PRODUCT MODAL */}

      {showProductModal && (
        <ProductModal
          editingProduct={editingProduct}
          form={productForm}
          saving={savingProduct}
          onChange={handleProductChange}
          onSubmit={saveProduct}
          imagePreview={productImagePreview}
          onImageChange={handleProductImageChange}
          onClose={() => {
            setShowProductModal(false);
            resetProductForm();
          }}
        />
      )}
    </div>
  );
};

/* ============================================================
   DASHBOARD
============================================================ */

const Dashboard = ({
  orders,
  products,
  customers,
  totalRevenue,
  pendingOrders,
  processingOrders,
  deliveredOrders,
  onOrders,
  onProducts,
  onCustomers,
}) => {
  return (
    <>
      <div
        className="admin-page-heading"
        style={styles.pageHeading}
      >
        <div>
          <p style={styles.eyebrow}>OVERVIEW</p>

          <h2
            className="admin-section-title"
            style={styles.sectionTitle}
          >
            Dashboard
          </h2>

          <p style={styles.sectionSubtitle}>
            Welcome back. Here's what's happening
            with your store.
          </p>
        </div>
      </div>

      <div
        className="admin-stats-grid"
        style={styles.statsGrid}
      >
        <StatCard
          title="Total Orders"
          value={orders.length}
          icon={<OrdersIcon size={21} />}
        />

        <StatCard
          title="Total Revenue"
          value={`PKR ${formatPrice(totalRevenue)}`}
          icon={<RevenueIcon size={21} />}
        />

        <StatCard
          title="Products"
          value={products.length}
          icon={<ProductsIcon size={21} />}
        />

        <StatCard
          title="Customers"
          value={customers.length}
          icon={<UsersIcon size={21} />}
        />
      </div>

      <div
        className="admin-dashboard-grid"
        style={styles.dashboardGrid}
      >
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <div>
              <h3 style={styles.panelTitle}>
                Order Pipeline
              </h3>

              <p style={styles.panelSubtitle}>
                Current order status overview
              </p>
            </div>
          </div>

          <div style={styles.pipeline}>
            <PipelineItem
              number="01"
              value={pendingOrders}
              label="Pending"
            />

            <div style={styles.pipelineLine} />

            <PipelineItem
              number="02"
              value={processingOrders}
              label="Processing"
            />

            <div style={styles.pipelineLine} />

            <PipelineItem
              number="03"
              value={deliveredOrders}
              label="Delivered"
            />
          </div>
        </div>

        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <div>
              <h3 style={styles.panelTitle}>
                Quick Actions
              </h3>
            </div>
          </div>

          <div style={styles.quickGrid}>
            <QuickAction
              icon={<OrdersIcon size={18} />}
              title="View Orders"
              text="Manage customer orders"
              onClick={onOrders}
            />

            <QuickAction
              icon={<ProductsIcon size={18} />}
              title="Products"
              text="Manage store inventory"
              onClick={onProducts}
            />

            <QuickAction
              icon={<UsersIcon size={18} />}
              title="Customers"
              text="View registered users"
              onClick={onCustomers}
            />
          </div>
        </div>
      </div>

      <div style={styles.panel}>
        <div style={styles.panelHeader}>
          <div>
            <h3 style={styles.panelTitle}>
              Recent Orders
            </h3>

            <p style={styles.panelSubtitle}>
              Latest customer orders
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <EmptyState text="No orders found." />
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ORDER</th>
                  <th style={styles.th}>CUSTOMER</th>
                  <th style={styles.th}>TOTAL</th>
                  <th style={styles.th}>STATUS</th>
                  <th style={styles.th}>DATE</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 6).map((order) => (
                  <tr key={order.id}>
                    <td style={styles.td}>
                      #{order.id}
                    </td>

                    <td style={styles.td}>
                      <strong>
                        {order.customer_name || "Unknown"}
                      </strong>
                    </td>

                    <td style={styles.td}>
                      PKR{" "}
                      {formatPrice(order.total_amount)}
                    </td>

                    <td style={styles.td}>
                      <StatusBadge
                        status={order.status}
                      />
                    </td>

                    <td style={styles.td}>
                      {formatDate(order.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

/* ============================================================
   ORDERS PAGE
============================================================ */

const OrdersPage = ({
  orders,
  search,
  setSearch,
  loading,
  refresh,
  onDetails,
  onStatusChange,
  onDelete,
}) => {
  return (
    <>
      <div
        className="admin-page-heading"
        style={styles.pageHeading}
      >
        <div>
          <p style={styles.eyebrow}>
            ORDER MANAGEMENT
          </p>

          <h2
            className="admin-section-title"
            style={styles.sectionTitle}
          >
            Orders
          </h2>

          <p style={styles.sectionSubtitle}>
            View and manage all customer orders.
          </p>
        </div>
      </div>

      <div style={styles.panel}>
        <div
          className="admin-toolbar"
          style={styles.toolbar}
        >
          <div
            className="admin-search"
            style={styles.searchBox}
          >
            <SearchIcon size={16} />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search orders..."
              style={styles.searchInput}
            />
          </div>

          <button
            style={styles.outlineButton}
            onClick={refresh}
          >
            <RefreshIcon size={14} />
            Refresh
          </button>
        </div>

        {loading ? (
          <LoadingState text="Loading orders..." />
        ) : orders.length === 0 ? (
          <EmptyState text="No orders found." />
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>CUSTOMER</th>
                  <th style={styles.th}>EMAIL</th>
                  <th style={styles.th}>TOTAL</th>
                  <th style={styles.th}>STATUS</th>
                  <th style={styles.th}>DATE</th>
                  <th style={styles.th}>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td style={styles.td}>
                      #{order.id}
                    </td>

                    <td style={styles.td}>
                      <strong>
                        {order.customer_name ||
                          "Unknown"}
                      </strong>
                    </td>

                    <td style={styles.td}>
                      {order.customer_email || "N/A"}
                    </td>

                    <td style={styles.td}>
                      <strong>
                        PKR{" "}
                        {formatPrice(
                          order.total_amount
                        )}
                      </strong>
                    </td>

                    <td style={styles.td}>
                      <select
                        value={
                          order.status || "pending"
                        }
                        onChange={(e) =>
                          onStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                        style={{
                          ...styles.statusSelect,
                          ...getStatusStyle(
                            order.status
                          ),
                        }}
                      >
                        <option value="pending">
                          Pending
                        </option>

                        <option value="processing">
                          Processing
                        </option>

                        <option value="shipped">
                          Shipped
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>
                      </select>
                    </td>

                    <td style={styles.td}>
                      {formatDate(order.created_at)}
                    </td>

                    <td style={styles.td}>
                      <div style={styles.actionRow}>
                        <button
                          style={styles.actionButton}
                          onClick={() =>
                            onDetails(order.id)
                          }
                        >
                          View
                        </button>

                        <button
                          style={{
                            ...styles.actionButton,
                            ...styles.deleteButton,
                          }}
                          onClick={() =>
                            onDelete(order.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

/* ============================================================
   PRODUCTS PAGE
   IMAGE COLUMN ADDED
============================================================ */

const ProductsPage = ({
  products,
  search,
  setSearch,
  loading,
  refresh,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <div
        className="admin-page-heading"
        style={styles.pageHeading}
      >
        <div>
          <p style={styles.eyebrow}>
            CATALOG MANAGEMENT
          </p>

          <h2
            className="admin-section-title"
            style={styles.sectionTitle}
          >
            Product Inventory
          </h2>

          <p style={styles.sectionSubtitle}>
            Manage and update your store products.
          </p>
        </div>

        <button
          style={styles.primaryButton}
          onClick={onAdd}
        >
          <PlusIcon size={15} />
          Add New Product
        </button>
      </div>

      <div style={styles.panel}>
        <div
          className="admin-toolbar"
          style={styles.toolbar}
        >
          <div
            className="admin-search"
            style={styles.searchBox}
          >
            <SearchIcon size={16} />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products..."
              style={styles.searchInput}
            />
          </div>

          <button
            style={styles.outlineButton}
            onClick={refresh}
          >
            <RefreshIcon size={14} />
            Refresh
          </button>
        </div>

        {loading ? (
          <LoadingState text="Loading products..." />
        ) : products.length === 0 ? (
          <EmptyState text="No products found." />
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>
                    IMAGE
                  </th>

                  <th style={styles.th}>
                    PRODUCT
                  </th>

                  <th style={styles.th}>
                    PRICE
                  </th>

                  <th style={styles.th}>
                    CATEGORY
                  </th>

                  <th style={styles.th}>
                    STOCK
                  </th>

                  <th style={styles.th}>
                    ACTIONS
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={styles.td}>
                      <img
                        src={getProductImageUrl(product)}
                        alt={product.title || "Product"}
                        style={styles.productThumb}
                        onError={(e) => {
                          if (e.currentTarget.src !== NO_IMAGE_PLACEHOLDER) {
                            e.currentTarget.src = NO_IMAGE_PLACEHOLDER;
                          }
                        }}
                      />
                    </td>

                    <td style={styles.td}>
                      <strong
                        style={{
                          display: "block",
                        }}
                      >
                        {product.title}
                      </strong>

                      <span
                        style={{
                          fontSize: "11px",
                          color: "#92999d",
                        }}
                      >
                        {product.description ||
                          "No description"}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <strong>
                        PKR{" "}
                        {formatPrice(product.price)}
                      </strong>
                    </td>

                    <td style={styles.td}>
                      <span
                        style={styles.categoryBadge}
                      >
                        {product.category}
                      </span>
                    </td>

                    <td style={styles.td}>
                      {product.stock ?? 0}
                    </td>

                    <td style={styles.td}>
                      <div style={styles.actionRow}>
                        <button
                          style={styles.actionButton}
                          onClick={() =>
                            onEdit(product)
                          }
                        >
                          Edit
                        </button>

                        <button
                          style={{
                            ...styles.actionButton,
                            ...styles.deleteButton,
                          }}
                          onClick={() =>
                            onDelete(product.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

/* ============================================================
   CUSTOMERS PAGE
============================================================ */

const CustomersPage = ({
  customers,
  search,
  setSearch,
  loading,
  refresh,
  onEdit,
}) => {
  return (
    <>
      <div
        className="admin-page-heading"
        style={styles.pageHeading}
      >
        <div>
          <p style={styles.eyebrow}>
            CUSTOMER MANAGEMENT
          </p>

          <h2
            className="admin-section-title"
            style={styles.sectionTitle}
          >
            Customers
          </h2>

          <p style={styles.sectionSubtitle}>
            View users who have registered on your
            Vestro X store.
          </p>
        </div>
      </div>

      <div style={styles.panel}>
        <div
          className="admin-toolbar"
          style={styles.toolbar}
        >
          <div
            className="admin-search"
            style={styles.searchBox}
          >
            <SearchIcon size={16} />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search customers..."
              style={styles.searchInput}
            />
          </div>

          <button
            style={styles.outlineButton}
            onClick={refresh}
          >
            <RefreshIcon size={14} />
            Refresh
          </button>
        </div>

        {loading ? (
          <LoadingState text="Loading customers..." />
        ) : customers.length === 0 ? (
          <EmptyState text="No customers found." />
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>CUSTOMER</th>
                  <th style={styles.th}>EMAIL</th>
                  <th style={styles.th}>PHONE</th>
                  <th style={styles.th}>ADDRESS</th>
                  <th style={styles.th}>ROLE</th>
                  <th style={styles.th}>JOINED</th>
                  <th style={styles.th}>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td style={styles.td}>
                      #{customer.id}
                    </td>

                    <td style={styles.td}>
                      <div
                        style={
                          styles.customerCell
                        }
                      >
                        <div
                          style={
                            styles.customerAvatar
                          }
                        >
                          {String(
                            customer.name || "U"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong
                            style={{
                              display: "block",
                            }}
                          >
                            {customer.name ||
                              "Unknown User"}
                          </strong>

                          <span
                            style={
                              styles.customerSmall
                            }
                          >
                            Customer #{customer.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td style={styles.td}>
                      {customer.email || "N/A"}
                    </td>

                    <td style={styles.td}>
                      {customer.phone || "N/A"}
                    </td>

                    <td
                      style={{
                        ...styles.td,
                        minWidth: "180px",
                      }}
                    >
                      {customer.address || "N/A"}
                    </td>

                    <td style={styles.td}>
                      <span
                        style={
                          styles.userBadge
                        }
                      >
                        {normalizeRole(
                          customer.role
                        )}
                      </span>
                    </td>

                    <td style={styles.td}>
                      {formatDate(
                        customer.created_at
                      )}
                    </td>

                    <td style={styles.td}>
                      <button
                        style={styles.actionButton}
                        onClick={() => onEdit(customer)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

/* ============================================================
   ADMINS PAGE
============================================================ */

const AdminsPage = ({
  admins,
  search,
  setSearch,
  loading,
  refresh,
  onAdd,
}) => {
  return (
    <>
      <div
        className="admin-page-heading"
        style={styles.pageHeading}
      >
        <div>
          <p style={styles.eyebrow}>ADMIN MANAGEMENT</p>
          <h2
            className="admin-section-title"
            style={styles.sectionTitle}
          >
            Admins
          </h2>
          <p style={styles.sectionSubtitle}>
            Create and manage administrator accounts for Vestro X.
          </p>
        </div>

        <button
          style={styles.primaryButton}
          onClick={onAdd}
        >
          <PlusIcon size={15} />
          Add Admin
        </button>
      </div>

      <div style={styles.panel}>
        <div
          className="admin-toolbar"
          style={styles.toolbar}
        >
          <div
            className="admin-search"
            style={styles.searchBox}
          >
            <SearchIcon size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search admins..."
              style={styles.searchInput}
            />
          </div>

          <button
            style={styles.outlineButton}
            onClick={refresh}
          >
            <RefreshIcon size={14} />
            Refresh
          </button>
        </div>

        {loading ? (
          <LoadingState text="Loading admins..." />
        ) : admins.length === 0 ? (
          <EmptyState text="No admins found." />
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>ADMIN</th>
                  <th style={styles.th}>EMAIL</th>
                  <th style={styles.th}>ROLE</th>
                  <th style={styles.th}>JOINED</th>
                </tr>
              </thead>

              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td style={styles.td}>#{admin.id}</td>

                    <td style={styles.td}>
                      <div style={styles.customerCell}>
                        <div style={styles.customerAvatar}>
                          {String(admin.name || "A")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong style={{ display: "block" }}>
                            {admin.name || "Admin"}
                          </strong>
                          <span style={styles.customerSmall}>
                            Administrator #{admin.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td style={styles.td}>
                      {admin.email || "N/A"}
                    </td>

                    <td style={styles.td}>
                      <span style={styles.adminBadge}>admin</span>
                    </td>

                    <td style={styles.td}>
                      {formatDate(admin.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

/* ============================================================
   CUSTOMER EDIT MODAL
============================================================ */

const CustomerEditModal = ({
  customer,
  onClose,
  onMakeAdmin,
}) => {
  return (
    <div
      style={styles.modalOverlay}
      onMouseDown={onClose}
    >
      <div
        className="admin-modal"
        style={styles.customerModal}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div style={styles.modalHeader}>
          <div>
            <p style={styles.eyebrow}>CUSTOMER EDIT</p>
            <h3 style={styles.modalTitle}>
              {customer.name || "Customer"}
            </h3>
            <p style={styles.modalSubtitle}>
              Manage this customer's account role.
            </p>
          </div>

          <button
            style={styles.modalClose}
            onClick={onClose}
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="admin-customer-edit-grid" style={styles.customerEditGrid}>
          <div>
            <span style={styles.infoLabel}>Name</span>
            <strong>{customer.name || "N/A"}</strong>
          </div>

          <div>
            <span style={styles.infoLabel}>Email</span>
            <strong>{customer.email || "N/A"}</strong>
          </div>

          <div>
            <span style={styles.infoLabel}>Phone</span>
            <strong>{customer.phone || "N/A"}</strong>
          </div>

          <div>
            <span style={styles.infoLabel}>Current Role</span>
            <span style={styles.userBadge}>
              {normalizeRole(customer.role)}
            </span>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <span style={styles.infoLabel}>Address</span>
            <strong>{customer.address || "N/A"}</strong>
          </div>
        </div>

        <div className="admin-promotion-box" style={styles.adminPromotionBox}>
          <div>
            <strong style={styles.promotionTitle}>
              Make this customer an admin
            </strong>
            <p style={styles.promotionText}>
              The account will be moved to the Admins section and will use
              the same email and password already stored for this user.
            </p>
          </div>

          <button
            type="button"
            style={styles.adminActionButton}
            onClick={onMakeAdmin}
          >
            Make Admin
          </button>
        </div>

        <div style={styles.modalActions}>
          <button
            type="button"
            style={styles.secondaryButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   ADMIN CREATE MODAL
============================================================ */

const AdminCreateModal = ({
  form,
  saving,
  onChange,
  onSubmit,
  onClose,
}) => {
  return (
    <div
      style={styles.modalOverlay}
      onMouseDown={onClose}
    >
      <div
        className="admin-modal"
        style={styles.productModal}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div style={styles.modalHeader}>
          <div>
            <p style={styles.eyebrow}>ADMIN MANAGEMENT</p>
            <h3 style={styles.modalTitle}>Create New Admin</h3>
            <p style={styles.modalSubtitle}>
              Create a new user account with administrator access.
            </p>
          </div>

          <button
            style={styles.modalClose}
            onClick={onClose}
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="admin-form-grid" style={styles.formGrid}>
            <FormField
              label="Admin Name"
              value={form.name}
              onChange={(value) => onChange("name", value)}
              placeholder="Enter admin name"
            />

            <FormField
              label="Email"
              value={form.email}
              onChange={(value) => onChange("email", value)}
              placeholder="admin@example.com"
              type="email"
            />

            <div style={{ gridColumn: "1 / -1" }}>
              <FormField
                label="Password"
                value={form.password}
                onChange={(value) => onChange("password", value)}
                placeholder="Minimum 6 characters"
                type="password"
              />
            </div>
          </div>

          <div style={styles.adminSecurityNote}>
            Password will be hashed by the backend before it is saved to MySQL.
          </div>

          <div style={styles.modalActions}>
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={styles.primaryButton}
              disabled={saving}
            >
              {saving ? "Creating..." : "Create Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ============================================================
   PRODUCT MODAL
   IMAGE FIELD AND PREVIEW COMPLETELY REMOVED
============================================================ */

const ProductModal = ({
  editingProduct,
  form,
  saving,
  onChange,
  onSubmit,
  onClose,
  imagePreview,
  onImageChange,
}) => {
  return (
    <div
      style={styles.modalOverlay}
      onMouseDown={onClose}
    >
      <div
        className="admin-modal"
        style={styles.productModal}
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <div style={styles.modalHeader}>
          <div>
            <h3 style={styles.modalTitle}>
              {editingProduct
                ? "Edit Product"
                : "Add New Product"}
            </h3>

            <p style={styles.modalSubtitle}>
              {editingProduct
                ? "Update product information."
                : "Add a new product to your store."}
            </p>
          </div>

          <button
            style={styles.modalClose}
            onClick={onClose}
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div
            className="admin-form-grid"
            style={styles.formGrid}
          >
            <FormField
              label="Product Title"
              value={form.title}
              onChange={(value) =>
                onChange("title", value)
              }
              placeholder="Enter product title"
            />

            <FormField
              label="Price"
              value={form.price}
              onChange={(value) =>
                onChange("price", value)
              }
              placeholder="Enter price"
              type="number"
            />

            <FormField
              label="Stock"
              value={form.stock}
              onChange={(value) =>
                onChange("stock", value)
              }
              placeholder="Enter stock"
              type="number"
            />

            <div>
              <label style={styles.formLabel}>
                Category
              </label>

              <select
                value={form.category}
                onChange={(e) =>
                  onChange(
                    "category",
                    e.target.value
                  )
                }
                style={styles.formInput}
              >
                <option value="Men">
                  Men
                </option>

                <option value="Women">
                  Women
                </option>

                <option value="Kid">
                  Kid
                </option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: "15px" }}>
            <label style={styles.formLabel}>
              Product Image
            </label>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <img
                src={
                  imagePreview ||
                  "data:image/svg+xml;utf8," +
                    encodeURIComponent(
                      `<svg xmlns='http://www.w3.org/2000/svg' width='70' height='70'><rect width='70' height='70' rx='8' fill='#eeeeec'/></svg>`
                    )
                }
                alt="Product preview"
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #d2d5d3",
                  flexShrink: 0,
                }}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => onImageChange(e.target.files?.[0] || null)}
                style={{ fontSize: "12px" }}
              />
            </div>
          </div>

          <div style={{ marginTop: "15px" }}>
            <label style={styles.formLabel}>
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) =>
                onChange(
                  "description",
                  e.target.value
                )
              }
              placeholder="Enter product description"
              rows={5}
              style={{
                ...styles.formInput,
                resize: "vertical",
              }}
            />
          </div>

          <div style={styles.modalActions}>
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={styles.primaryButton}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingProduct
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ============================================================
   ORDER MODAL
   PRODUCT IMAGES REMOVED
============================================================ */

const OrderModal = ({
  order,
  items,
  onClose,
}) => {
  return (
    <div
      style={styles.modalOverlay}
      onMouseDown={onClose}
    >
      <div
        className="admin-modal"
        style={styles.orderModal}
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        <div style={styles.modalHeader}>
          <div>
            <p style={styles.eyebrow}>
              ORDER DETAILS
            </p>

            <h3 style={styles.modalTitle}>
              Order #{order.id}
            </h3>
          </div>

          <button
            style={styles.modalClose}
            onClick={onClose}
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <div
          className="admin-order-customer"
          style={styles.orderCustomerBox}
        >
          <div>
            <span style={styles.infoLabel}>
              Customer
            </span>

            <strong>
              {order.customer_name || "N/A"}
            </strong>
          </div>

          <div>
            <span style={styles.infoLabel}>
              Email
            </span>

            <strong>
              {order.customer_email || "N/A"}
            </strong>
          </div>

          <div>
            <span style={styles.infoLabel}>
              Phone
            </span>

            <strong>
              {order.customer_phone || "N/A"}
            </strong>
          </div>
        </div>

        <div style={styles.modalSection}>
          <h4 style={styles.modalSectionTitle}>
            Products
          </h4>

          {items.length === 0 ? (
            <EmptyState text="No order items found." />
          ) : (
            <div style={styles.orderItems}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={styles.orderItem}
                >
                  <div
                    style={
                      styles.orderItemLeft
                    }
                  >
                    <div>
                      <strong>
                        {item.title ||
                          "Product"}
                      </strong>

                      <p
                        style={
                          styles.itemPrice
                        }
                      >
                        Price: PKR{" "}
                        {formatPrice(
                          item.price
                        )}
                      </p>

                      <span
                        style={
                          styles.itemQuantity
                        }
                      >
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>

                  <strong>
                    PKR{" "}
                    {formatPrice(
                      Number(item.price || 0) *
                        Number(item.quantity || 0)
                    )}
                  </strong>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.modalSection}>
          <h4 style={styles.modalSectionTitle}>
            Shipping Information
          </h4>

          <div style={styles.shippingInfo}>
            <div>
              <strong>
                Address:
              </strong>{" "}
              {order.shipping_address || "N/A"}
            </div>

            <div>
              <strong>
                Payment:
              </strong>{" "}
              {order.payment_method || "COD"}
            </div>

            <div>
              <strong>
                Order Date:
              </strong>{" "}
              {formatDateTime(
                order.created_at
              )}
            </div>
          </div>
        </div>

        <div style={styles.orderTotal}>
          <strong>
            Order Total
          </strong>

          <strong
            style={{
              color: "#3f6850",
            }}
          >
            PKR{" "}
            {formatPrice(
              order.total_amount
            )}
          </strong>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SMALL COMPONENTS
============================================================ */

const NavButton = ({
  active,
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      className="admin-nav-button"
      onClick={onClick}
      style={{
        ...styles.navButton,
        background: active
          ? "rgba(255,255,255,0.12)"
          : "transparent",
        color: active
          ? "#fff"
          : "#aeb6bb",
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const StatCard = ({
  title,
  value,
  icon,
}) => {
  return (
    <div style={styles.statCard}>
      <div style={styles.statIcon}>
        {icon}
      </div>

      <p style={styles.statLabel}>
        {title}
      </p>

      <h3 style={styles.statValue}>
        {value}
      </h3>
    </div>
  );
};

const PipelineItem = ({
  label,
  value,
  number,
}) => {
  return (
    <div style={styles.pipelineItem}>
      <div style={styles.pipelineNumber}>
        {number}
      </div>

      <strong style={styles.pipelineValue}>
        {value}
      </strong>

      <span style={styles.pipelineLabel}>
        {label}
      </span>
    </div>
  );
};

const QuickAction = ({
  icon,
  title,
  text,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={styles.quickAction}
    >
      <div style={styles.quickIcon}>
        {icon}
      </div>

      <div>
        <strong style={styles.quickTitle}>
          {title}
        </strong>

        <span style={styles.quickText}>
          {text}
        </span>
      </div>
    </button>
  );
};

const FormField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <div>
      <label style={styles.formLabel}>
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        style={styles.formInput}
      />
    </div>
  );
};

const StatusBadge = ({
  status,
}) => {
  const statusStyle =
    getStatusStyle(status);

  return (
    <span
      style={{
        ...styles.statusBadge,
        background:
          statusStyle.background,
        color:
          statusStyle.color,
        borderColor:
          statusStyle.border,
      }}
    >
      {status || "pending"}
    </span>
  );
};

const LoadingState = ({
  text,
}) => {
  return (
    <div style={styles.emptyState}>
      <div style={styles.spinner} />
      <span>{text}</span>
    </div>
  );
};

const EmptyState = ({
  text,
}) => {
  return (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>
        <BoxIcon size={21} />
      </div>

      <span>{text}</span>
    </div>
  );
};

/* ============================================================
   STATUS STYLE
============================================================ */

const getStatusStyle = (status) => {
  const value = String(
    status || "pending"
  ).toLowerCase();

  if (value === "delivered") {
    return {
      background: "#e8f4ec",
      color: "#3f6850",
      border: "#c9dfd0",
    };
  }

  if (value === "processing") {
    return {
      background: "#eef1f5",
      color: "#526170",
      border: "#d5dce3",
    };
  }

  if (value === "shipped") {
    return {
      background: "#eaf1f7",
      color: "#49667d",
      border: "#cbdbe8",
    };
  }

  if (value === "cancelled") {
    return {
      background: "#f7eaea",
      color: "#814848",
      border: "#e4caca",
    };
  }

  return {
    background: "#f5f1e6",
    color: "#806d3e",
    border: "#e4d9b9",
  };
};

/* ============================================================
   STYLES
============================================================ */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f3f1",
    color: "#252b2f",
    fontFamily:
      "Inter, Arial, Helvetica, sans-serif",
  },

  sidebar: {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    width: "235px",
    background:
      "linear-gradient(180deg, #29323a 0%, #202930 100%)",
    color: "#fff",
    zIndex: 100,
  },

  sidebarInner: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "22px 15px",
    boxSizing: "border-box",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    padding: "4px 9px 25px",
  },

  brandLogo: {
    width: "42px",
    height: "42px",
    objectFit: "contain",
  },

  brandName: {
    display: "block",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "800",
    letterSpacing: "0.02em",
  },

  brandSub: {
    display: "block",
    marginTop: "3px",
    color: "#aeb6bb",
    fontSize: "9px",
    letterSpacing: "0.08em",
  },

  sidebarNav: {
    display: "grid",
    gap: "5px",
  },

  navButton: {
    width: "100%",
    border: "none",
    borderRadius: "9px",
    padding: "11px 12px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    fontSize: "13px",
    textAlign: "left",
  },

  sidebarBottom: {
    marginTop: "auto",
    borderTop:
      "1px solid rgba(255,255,255,0.12)",
    padding: "22px 10px 0",
    color: "#81909a",
    fontSize: "11px",
    lineHeight: "2",
  },

  main: {
    marginLeft: "235px",
    minHeight: "100vh",
  },

  topbar: {
    minHeight: "76px",
    background: "#fafaf9",
    borderBottom: "1px solid #dedfdd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 30px",
    gap: "15px",
    boxSizing: "border-box",
  },

  topEyebrow: {
    margin: 0,
    color: "#899196",
    fontSize: "10px",
    letterSpacing: "0.1em",
  },

  topTitle: {
    margin: "3px 0 0",
    fontSize: "21px",
    color: "#252b2f",
  },

  adminArea: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  adminInfo: {
    display: "grid",
    textAlign: "right",
    gap: "3px",
    fontSize: "12px",
  },

  adminAvatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#e7eaed",
    border: "1px solid #d3d7da",
    color: "#4c5963",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },

  content: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "28px 30px 50px",
    boxSizing: "border-box",
  },

  pageHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "20px",
    marginBottom: "25px",
  },

  eyebrow: {
    margin: 0,
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    color: "#91989c",
  },

  sectionTitle: {
    margin: "6px 0 4px",
    color: "#252b2f",
    fontSize: "27px",
  },

  sectionSubtitle: {
    margin: 0,
    color: "#858d92",
    fontSize: "13px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    marginBottom: "18px",
  },

  statCard: {
    background: "#fafaf9",
    border: "1px solid #dedfdd",
    borderRadius: "12px",
    padding: "20px",
  },

  statIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    background: "#e9eae8",
    color: "#58636b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15px",
  },

  statLabel: {
    margin: "0 0 7px",
    color: "#8a9298",
    fontSize: "12px",
  },

  statValue: {
    margin: 0,
    color: "#252b2f",
    fontSize: "24px",
    fontWeight: "700",
  },

  dashboardGrid: {
    display: "grid",
    gridTemplateColumns:
      "1.5fr 1fr",
    gap: "18px",
    marginBottom: "18px",
  },

  panel: {
    background: "#fafaf9",
    border: "1px solid #dedfdd",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "18px",
    boxSizing: "border-box",
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "18px",
  },

  panelTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#30373c",
  },

  panelSubtitle: {
    margin: "4px 0 0",
    color: "#92999d",
    fontSize: "11px",
  },

  pipeline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 5px",
  },

  pipelineItem: {
    minWidth: "90px",
    textAlign: "center",
  },

  pipelineNumber: {
    fontSize: "11px",
    color: "#a0a6aa",
    marginBottom: "7px",
  },

  pipelineValue: {
    display: "block",
    fontSize: "20px",
    color: "#333a3f",
  },

  pipelineLabel: {
    color: "#858d92",
    fontSize: "11px",
  },

  pipelineLine: {
    height: "1px",
    background: "#d9dcda",
    flex: 1,
    margin: "0 8px",
  },

  quickGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "10px",
  },

  quickAction: {
    border: "1px solid #e1e3e1",
    background: "#f7f7f5",
    borderRadius: "10px",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    textAlign: "left",
    color: "#30373c",
  },

  quickIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    background: "#e7e9e8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#56616a",
    flexShrink: 0,
  },

  quickTitle: {
    display: "block",
    fontSize: "13px",
  },

  quickText: {
    display: "block",
    marginTop: "3px",
    fontSize: "11px",
    color: "#92999d",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
  },

  searchBox: {
    flex: 1,
    maxWidth: "400px",
    minWidth: "180px",
    display: "flex",
    alignItems: "center",
    gap: "9px",
    background: "#f3f3f1",
    border: "1px solid #dcdedc",
    borderRadius: "8px",
    padding: "0 11px",
    color: "#8c969c",
  },

  searchInput: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "10px 0",
    color: "#30373c",
    fontSize: "12px",
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
  },

  table: {
    width: "100%",
    minWidth: "700px",
    borderCollapse: "collapse",
  },

  th: {
    padding: "13px 11px",
    textAlign: "left",
    background: "#f0f1ef",
    color: "#626b71",
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "14px 11px",
    borderBottom: "1px solid #e8e9e7",
    color: "#4c555b",
    fontSize: "12px",
    verticalAlign: "middle",
  },

  productThumb: {
    width: "46px",
    height: "46px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "1px solid #dedfdd",
    display: "block",
  },

  actionRow: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },

  actionButton: {
    border: "1px solid #d5d8d6",
    background: "#f0f1ef",
    color: "#4d5961",
    padding: "7px 10px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
  },

  deleteButton: {
    background: "#f8eeee",
    borderColor: "#e3cccc",
    color: "#824d4d",
  },

  outlineButton: {
    border: "1px solid #cdd1d0",
    background: "#303a42",
    color: "#fff",
    padding: "9px 12px",
    borderRadius: "7px",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    whiteSpace: "nowrap",
  },

  refreshButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    border: "none",
    background: "#303a42",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "7px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    border: "none",
    background: "#303a42",
    color: "#fff",
    padding: "11px 15px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    border: "1px solid #d2d5d3",
    background: "#f2f2f0",
    color: "#59636a",
    padding: "11px 15px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },

  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 9px",
    borderRadius: "6px",
    border: "1px solid",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "capitalize",
  },

  statusSelect: {
    padding: "6px 8px",
    borderRadius: "6px",
    outline: "none",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
  },

  categoryBadge: {
    display: "inline-block",
    background: "#eeeeec",
    color: "#687177",
    border: "1px solid #dfe1df",
    borderRadius: "5px",
    padding: "4px 7px",
    fontSize: "10px",
    textTransform: "capitalize",
  },

  customerCell: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
  },

  customerAvatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#e8ebe9",
    color: "#526069",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    flexShrink: 0,
  },

  customerSmall: {
    display: "block",
    marginTop: "3px",
    color: "#999fa3",
    fontSize: "10px",
  },

  userBadge: {
    display: "inline-block",
    background: "#edf1ed",
    color: "#4f6657",
    border: "1px solid #d6dfd8",
    borderRadius: "5px",
    padding: "4px 8px",
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "capitalize",
  },

  customerModal: {
    width: "100%",
    maxWidth: "620px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#fafaf9",
    border: "1px solid #d9dbd9",
    borderRadius: "14px",
    padding: "25px",
    boxShadow: "0 25px 70px rgba(0,0,0,0.20)",
    boxSizing: "border-box",
  },

  customerEditGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px",
    padding: "16px",
    background: "#f3f3f1",
    borderRadius: "9px",
  },

  adminPromotionBox: {
    marginTop: "18px",
    padding: "16px",
    border: "1px solid #d6dfd8",
    background: "#edf3ee",
    borderRadius: "9px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
  },

  promotionTitle: {
    display: "block",
    color: "#3f5f4b",
    fontSize: "13px",
  },

  promotionText: {
    margin: "5px 0 0",
    color: "#748278",
    fontSize: "11px",
    lineHeight: "1.6",
  },

  adminActionButton: {
    border: "none",
    background: "#3f6850",
    color: "#fff",
    padding: "10px 13px",
    borderRadius: "7px",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  adminBadge: {
    display: "inline-block",
    background: "#e7edf5",
    color: "#455b73",
    border: "1px solid #d0dae5",
    borderRadius: "5px",
    padding: "4px 8px",
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "capitalize",
  },

  adminSecurityNote: {
    marginTop: "15px",
    padding: "10px 12px",
    background: "#f0f1ef",
    border: "1px solid #dedfdd",
    borderRadius: "7px",
    color: "#777f84",
    fontSize: "10px",
  },

  emptyState: {
    padding: "55px 20px",
    textAlign: "center",
    color: "#90979b",
    fontSize: "12px",
  },

  emptyIcon: {
    width: "44px",
    height: "44px",
    margin: "0 auto 12px",
    borderRadius: "10px",
    background: "#eeeeec",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#939a9e",
  },

  spinner: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "3px solid #dfe1df",
    borderTopColor: "#59656e",
    margin: "0 auto 12px",
    animation:
      "adminSpin 0.8s linear infinite",
  },

  errorBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    background: "#f5e8e8",
    color: "#814848",
    border: "1px solid #e2caca",
    padding: "12px 14px",
    borderRadius: "8px",
    marginBottom: "18px",
    fontSize: "12px",
  },

  errorClose: {
    border: "none",
    background: "transparent",
    color: "#814848",
    fontSize: "20px",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 5000,
    background: "rgba(28,34,38,0.58)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
  },

  productModal: {
    width: "100%",
    maxWidth: "620px",
    maxHeight: "92vh",
    overflowY: "auto",
    background: "#fafaf9",
    border: "1px solid #d9dbd9",
    borderRadius: "14px",
    padding: "25px",
    boxShadow:
      "0 25px 70px rgba(0,0,0,0.20)",
    boxSizing: "border-box",
  },

  orderModal: {
    width: "100%",
    maxWidth: "650px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#fafaf9",
    borderRadius: "14px",
    padding: "25px",
    boxShadow:
      "0 25px 70px rgba(0,0,0,0.20)",
    boxSizing: "border-box",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "22px",
  },

  modalTitle: {
    margin: "5px 0 0",
    color: "#30373c",
    fontSize: "19px",
  },

  modalSubtitle: {
    margin: "5px 0 0",
    color: "#92999d",
    fontSize: "11px",
  },

  modalClose: {
    width: "34px",
    height: "34px",
    border: "1px solid #d9dcda",
    borderRadius: "7px",
    background: "#f0f1ef",
    color: "#626b71",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "15px",
  },

  formLabel: {
    display: "block",
    marginBottom: "7px",
    color: "#586168",
    fontSize: "11px",
    fontWeight: "700",
  },

  formInput: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d2d5d3",
    borderRadius: "7px",
    outline: "none",
    background: "#fff",
    color: "#30373c",
    padding: "10px 11px",
    fontSize: "12px",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "9px",
    marginTop: "22px",
    paddingTop: "18px",
    borderTop: "1px solid #e5e7e5",
  },

  orderCustomerBox: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "12px",
    padding: "14px",
    background: "#f3f3f1",
    borderRadius: "9px",
    marginBottom: "20px",
  },

  infoLabel: {
    display: "block",
    color: "#92999d",
    fontSize: "10px",
    marginBottom: "4px",
  },

  modalSection: {
    marginTop: "20px",
    paddingBottom: "18px",
    borderBottom: "1px solid #e5e7e5",
  },

  modalSectionTitle: {
    margin: "0 0 12px",
    color: "#30373c",
    fontSize: "14px",
  },

  orderItems: {
    display: "grid",
    gap: "0",
  },

  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    padding: "12px 0",
    borderBottom: "1px solid #eeeeec",
  },

  orderItemLeft: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    minWidth: 0,
  },

  itemPrice: {
    color: "#8b9297",
    fontSize: "10px",
    margin: "4px 0",
  },

  itemQuantity: {
    color: "#707a80",
    fontSize: "10px",
  },

  shippingInfo: {
    display: "grid",
    gap: "9px",
    color: "#616a70",
    fontSize: "12px",
  },

  orderTotal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    fontSize: "17px",
  },
};

/* ============================================================
   RESPONSIVE STYLE
============================================================ */

const ResponsiveStyle = () => (
  <style>
    {`
      @keyframes adminSpin {
        to {
          transform: rotate(360deg);
        }
      }

      * {
        box-sizing: border-box;
      }

      @media (max-width: 1100px) {
        .admin-stats-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }

      @media (max-width: 900px) {
        .admin-sidebar {
          width: 76px !important;
        }

        .admin-main {
          margin-left: 76px !important;
        }

        .admin-brand {
          justify-content: center;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        .admin-brand-name,
        .admin-brand-sub {
          display: none !important;
        }

        .admin-nav-button {
          justify-content: center !important;
          padding-left: 8px !important;
          padding-right: 8px !important;
        }

        .admin-nav-button span {
          display: none;
        }
      }

      @media (max-width: 760px) {
        .admin-sidebar {
          position: fixed !important;
          left: 0 !important;
          top: 0 !important;
          right: 0 !important;
          bottom: auto !important;
          width: 100% !important;
          height: 64px !important;
          z-index: 1000 !important;
        }

        .admin-sidebar-inner {
          height: 64px !important;
          padding: 8px 10px !important;
          flex-direction: row !important;
          align-items: center !important;
        }

        .admin-main {
          margin-left: 0 !important;
          padding-top: 64px !important;
        }

        .admin-brand {
          padding: 0 8px !important;
          border: none !important;
          justify-content: flex-start !important;
        }

        .admin-brand-name {
          display: block !important;
        }

        .admin-brand-sub {
          display: block !important;
        }

        .admin-sidebar-nav {
          display: flex !important;
          margin-left: auto !important;
          overflow-x: auto !important;
          gap: 5px !important;
        }

        .admin-sidebar-bottom {
          display: none !important;
        }

        .admin-nav-button {
          width: auto !important;
          white-space: nowrap !important;
          justify-content: flex-start !important;
        }

        .admin-nav-button span {
          display: inline !important;
        }

        .admin-topbar {
          padding: 12px 16px !important;
        }

        .admin-content {
          padding: 20px 15px 35px !important;
        }
      }

      @media (max-width: 650px) {
        .admin-stats-grid {
          grid-template-columns: 1fr !important;
        }

        .admin-dashboard-grid {
          grid-template-columns: 1fr !important;
        }

        .admin-page-heading {
          align-items: flex-start !important;
          flex-direction: column !important;
        }

        .admin-topbar {
          align-items: flex-start !important;
        }

        .admin-topbar-title {
          font-size: 17px !important;
        }

        .admin-admin-info {
          display: none !important;
        }

        .admin-refresh-text {
          display: none !important;
        }

        .admin-form-grid {
          grid-template-columns: 1fr !important;
        }

        .admin-customer-edit-grid {
          grid-template-columns: 1fr !important;
        }

        .admin-promotion-box {
          flex-direction: column !important;
          align-items: stretch !important;
        }

        .admin-order-customer {
          grid-template-columns: 1fr !important;
        }

        .admin-toolbar {
          flex-direction: column !important;
          align-items: stretch !important;
        }

        .admin-search {
          max-width: none !important;
        }

        .admin-pipeline {
          flex-direction: column !important;
          gap: 15px !important;
        }
      }

      @media (max-width: 480px) {
        .admin-brand-name {
          display: none !important;
        }

        .admin-brand-sub {
          display: none !important;
        }

        .admin-section-title {
          font-size: 23px !important;
        }

        .admin-modal {
          padding: 18px !important;
        }

        .admin-sidebar-nav {
          gap: 2px !important;
        }

        .admin-nav-button {
          padding: 9px !important;
        }

        .admin-nav-button span {
          display: none !important;
        }

        .admin-nav-button svg {
          width: 18px;
          height: 18px;
        }
      }
    `}
  </style>
);

/* ============================================================
   ICONS
============================================================ */

const IconBase = ({
  children,
  size = 20,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const DashboardIcon = ({
  size,
  color,
}) => (
  <IconBase size={size} color={color}>
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      rx="1"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      rx="1"
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      rx="1"
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      rx="1"
    />
  </IconBase>
);

const OrdersIcon = ({
  size,
  color,
}) => (
  <IconBase size={size} color={color}>
    <rect
      x="4"
      y="5"
      width="16"
      height="15"
      rx="2"
    />
    <path d="M8 5V3h8v2" />
    <path d="M8 10h8" />
    <path d="M8 14h5" />
  </IconBase>
);

const ProductsIcon = ({
  size,
  color,
}) => (
  <IconBase size={size} color={color}>
    <path d="M4 7l8-4 8 4-8 4-8-4z" />
    <path d="M4 7v10l8 4 8-4V7" />
    <path d="M12 11v10" />
  </IconBase>
);

const RevenueIcon = ({
  size,
  color,
}) => (
  <IconBase size={size} color={color}>
    <circle
      cx="12"
      cy="12"
      r="8"
    />
    <path d="M12 7v10" />
    <path d="M15 9.5c-.7-1-1.7-1.5-3-1.5-1.5 0-2.5.8-2.5 1.8 0 2.7 5.5 1.2 5.5 4 0 1.2-1 2-2.8 2-1.3 0-2.5-.5-3.2-1.5" />
  </IconBase>
);

const RefreshIcon = ({
  size,
  color,
}) => (
  <IconBase size={size} color={color}>
    <path d="M20 11a8 8 0 0 0-14-4L4 9" />
    <path d="M4 4v5h5" />
    <path d="M4 13a8 8 0 0 0 14 4l2-2" />
    <path d="M20 20v-5h-5" />
  </IconBase>
);

const SearchIcon = ({
  size,
  color,
}) => (
  <IconBase size={size} color={color}>
    <circle
      cx="11"
      cy="11"
      r="6.5"
    />
    <path d="M16 16l4 4" />
  </IconBase>
);

const PlusIcon = ({
  size,
  color,
}) => (
  <IconBase size={size} color={color}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </IconBase>
);

const CloseIcon = ({
  size,
  color,
}) => (
  <IconBase size={size} color={color}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </IconBase>
);

const BoxIcon = ({
  size,
  color,
}) => (
  <IconBase size={size} color={color}>
    <path d="M4 7l8-4 8 4-8 4-8-4z" />
    <path d="M4 7v10l8 4 8-4V7" />
    <path d="M12 11v10" />
  </IconBase>
);

const AdminIcon = ({
  size,
  color,
}) => (
  <IconBase size={size} color={color}>
    <circle cx="12" cy="8" r="3" />
    <path d="M5 20c0-3.3 2.7-6 7-6s7 2.7 7 6" />
    <path d="M18 4l1 2 2 .3-1.5 1.5.4 2.2-1.9-1-1.9 1 .4-2.2L15 6.3 17 6z" />
  </IconBase>
);

const UsersIcon = ({
  size,
  color,
}) => (
  <IconBase size={size} color={color}>
    <circle
      cx="9"
      cy="8"
      r="3"
    />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M16 5.5a3 3 0 0 1 0 5.8" />
    <path d="M18 14c1.9.8 3 2.4 3 4.5" />
  </IconBase>
);

/* ============================================================
   EXPORT
============================================================ */

export default function AdminPanelWithResponsiveStyle() {
  return (
    <>
      <ResponsiveStyle />
      <AdminPanel />
    </>
  );
}
