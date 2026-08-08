# Blog Turborepo

Blog Turborepo là dự án blog full-stack được tổ chức theo mô hình monorepo. Dự án gồm frontend Next.js trong `apps/front` và backend NestJS GraphQL trong `apps/api`, được điều phối bằng Turborepo.

## Công nghệ sử dụng

### Monorepo

- Turborepo để chạy, build và lint nhiều workspace.
- npm workspaces với cấu trúc `apps/*`.
- TypeScript cho cả frontend và backend.

### Frontend

- Next.js 16 với App Router.
- React 19 và React DOM 19.
- Tailwind CSS 4 cho giao diện.
- shadcn/ui, Base UI, Heroicons và Lucide React cho component và icon.
- TanStack React Query cho quản lý dữ liệu phía client.
- Zod để validate form.
- jose để tạo và xác thực session JWT trong cookie.
- Supabase SSR và Supabase Storage để upload ảnh thumbnail.

### Backend

- NestJS 11.
- GraphQL với Apollo Server và `@nestjs/graphql`.
- Prisma ORM 7.
- SQLite cho cơ sở dữ liệu local.
- Passport JWT và Passport Google OAuth2 cho xác thực.
- Argon2 để kiểm tra mật khẩu.
- Jest và Supertest cho unit/e2e testing.

## Tính năng chính

- Xem danh sách bài viết public với phân trang.
- Xem chi tiết bài viết theo slug/id.
- Đăng ký và đăng nhập bằng email/mật khẩu.
- Đăng nhập bằng Google OAuth.
- Quản lý session bằng HTTP-only cookie.
- Tạo, cập nhật và xóa bài viết của người dùng.
- Upload thumbnail bài viết lên Supabase Storage.
- Gắn tag cho bài viết.
- Bình luận trên bài viết.
- Like và unlike bài viết, kèm đếm lượt thích.
- Khu vực quản lý bài viết riêng cho người dùng đã đăng nhập.
- API GraphQL cho các domain: user, auth, post, tag, comment và like.

## Cấu trúc thư mục

```text
.
├── apps
│   ├── api      # Backend NestJS, GraphQL, Prisma
│   └── front    # Frontend Next.js
├── package.json # Scripts và npm workspaces
├── turbo.json   # Cấu hình Turborepo
└── README.md
```

## Yêu cầu môi trường

- Node.js phiên bản phù hợp với Next.js/NestJS hiện tại.
- npm.
- Tài khoản Supabase nếu muốn dùng upload ảnh.
- Google OAuth credentials nếu muốn dùng đăng nhập Google.

## Biến môi trường

Backend `apps/api` cần các biến:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:8000/auth/google/callback"
PORT=8000
```

Frontend `apps/front` cần các biến:

```env
SESSION_SECRET_KEY="your-session-secret"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-key"
```

## Cài đặt

Chạy ở thư mục root:

```bash
npm install
```

## Chạy dự án

Chạy cả frontend và backend qua Turborepo:

```bash
npm run dev
```

Mặc định:

- Frontend chạy ở `http://localhost:3000`.
- Backend chạy ở `http://localhost:8000`.

Có thể chạy từng app riêng:

```bash
npm run dev -w front
npm run dev -w api
```

## Database

Prisma schema nằm tại `apps/api/prisma/schema.prisma`. Database local mặc định dùng SQLite.

Seed dữ liệu mẫu:

```bash
npm run db:seed -w api
```

## Build và kiểm tra

Build toàn bộ dự án:

```bash
npm run build
```

Lint toàn bộ monorepo:

```bash
npm run lint
```

Chạy test backend:

```bash
npm run test -w api
npm run test:e2e -w api
```

## Ghi chú phát triển

- Frontend gọi backend GraphQL qua `BACKEND_URL` hiện được đặt là `http://localhost:8000` trong `apps/front/lib/constants.ts`.
- Backend tự sinh GraphQL schema tại `apps/api/src/graphql/schema.gql`.
- Supabase Storage bucket đang được dùng tên là `images`.
