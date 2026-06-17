## Changelog

### 2026-06-12

- Added full Harvest v3 API support alongside the existing v1/v2 surface; the v1/v2 API sunsets on August 31, 2026, so existing actions keep working unchanged until then and their labels now carry a **(Harvest v1/v2)** suffix
- Added the **OAuth 2.0 Client Credentials (Harvest V3)** connection for the Harvest v3 API
- Added 25 v3 actions with clean labels: **List/Get/Edit/Delete Application**, the new **Reject Application** and **Unreject Application** (v3 moves rejection out of application edits), **List/Get/Create/Edit/Delete Candidate**, the new **List/Create/Delete Attachment** actions (v3 moves candidate attachments to a dedicated resource), **List/Get/Create/Edit Job**, **List/Get/Create/Edit User**, **Activate User** and **Deactivate User** (replacing v1 enable/disable), and a v3 **Raw Request**
- Added the v3 **New and Updated Applications** polling trigger using the `last_activity_at[gte]` filter with cursor-based pagination; the v1 trigger remains available as deprecated
- Added v3 data sources for applications, candidates, custom fields, departments, jobs, offices, users, and the new **Fetch Rejection Reasons** powering the Reject Application dropdown
- Changed the **API Key** connection label to **API Key (Harvest v1/v2)** — it only reaches the sunsetting v1/v2 API
- Added the deprecated v1 **New and Updated Applications** polling trigger using the Harvest API's `last_activity_after` filter, walking all paginated results and partitioning them into created and updated buckets based on each application's `created_at` and `last_activity_at` timestamps
- Changed the **Secret Key** trigger input to a masked password field to prevent the value from being exposed in plaintext within the configuration UI

### 2026-04-30

Updated spectral version

### 2026-04-07

Added trigger documentation and global debug support across all actions for improved troubleshooting

### 2026-03-31

Various modernizations and documentation updates

### 2026-03-13

Removed the **Debug Request** input from all action inputs. Debug logging is now controlled internally and no longer appears as a configurable field in actions.

### 2026-02-26

Added inline data sources for offices, departments, applications, users, candidates, jobs, and templates to enable dynamic dropdown selection
