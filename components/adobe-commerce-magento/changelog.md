## Changelog

### 2026-06-11

Added **Fetch All** toggle to paginated list actions (List Products, List Orders, List Order Items, List Product Attributes, List Transactions, Search Customers) that automatically paginates through all results using `searchCriteria[currentPage]`/`searchCriteria[pageSize]`; when disabled, existing single-page behavior is preserved

### 2026-05-28

Added **New and Updated Records** polling trigger that monitors orders, customers, or products for changes and routes newly created records and updated records to separate branches

### 2026-05-20

Applied automated security patches and code formatting updates

### 2026-04-30

Updated spectral version

### 2026-04-07

Added global debug support across all actions for improved troubleshooting

### 2026-03-05

Added inline data sources for orders, transactions, and customers to enhance data selection capabilities
