import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Tạo admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@samsung.com" },
    update: {},
    create: {
      id: "admin-001",
      name: "Admin",
      email: "admin@samsung.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  // Tạo staff users (role: user để vào được CMS)
  const staffPassword = await bcrypt.hash("staff123", 10);
  const staffUsers = [
    { id: "staff-001", name: "Nhân viên 1", email: "staff1@samsung.com" },
    { id: "staff-002", name: "Nhân viên 2", email: "staff2@samsung.com" },
    { id: "staff-003", name: "Nhân viên 3", email: "staff3@samsung.com" },
  ];

  for (const staff of staffUsers) {
    await prisma.user.upsert({
      where: { email: staff.email },
      update: {},
      create: {
        ...staff,
        password: staffPassword,
        role: "user",
      },
    });
  }

  // Tạo mock customers
  const customers = [
    {
      name: "Nguyễn Văn An",
      phone: "0901234567",
      email: "an.nguyen@email.com",
      journey1: true,
      journey2: true,
      journey3: false,
      journey4: false,
      gift1: true,
      gift2: false,
    },
    {
      name: "Trần Thị Bình",
      phone: "0912345678",
      email: "binh.tran@email.com",
      journey1: true,
      journey2: true,
      journey3: true,
      journey4: true,
      gift1: true,
      gift2: true,
    },
    {
      name: "Lê Minh Châu",
      phone: "0923456789",
      email: "chau.le@email.com",
      journey1: true,
      journey2: false,
      journey3: false,
      journey4: false,
      gift1: false,
      gift2: false,
    },
    {
      name: "Phạm Đức Dũng",
      phone: "0934567890",
      email: "dung.pham@email.com",
      journey1: true,
      journey2: true,
      journey3: true,
      journey4: false,
      gift1: true,
      gift2: false,
    },
    {
      name: "Hoàng Thị Em",
      phone: "0945678901",
      email: "em.hoang@email.com",
      journey1: true,
      journey2: true,
      journey3: true,
      journey4: true,
      gift1: true,
      gift2: true,
    },
    {
      name: "Vũ Văn Phong",
      phone: "0956789012",
      email: "phong.vu@email.com",
      journey1: true,
      journey2: true,
      journey3: false,
      journey4: false,
      gift1: false,
      gift2: false,
    },
    {
      name: "Đặng Thị Giang",
      phone: "0967890123",
      email: "giang.dang@email.com",
      journey1: true,
      journey2: true,
      journey3: true,
      journey4: true,
      gift1: true,
      gift2: false,
    },
    {
      name: "Bùi Văn Hải",
      phone: "0978901234",
      email: "hai.bui@email.com",
      journey1: true,
      journey2: false,
      journey3: false,
      journey4: false,
      gift1: false,
      gift2: false,
    },
    {
      name: "Ngô Thị Hương",
      phone: "0989012345",
      email: "huong.ngo@email.com",
      journey1: true,
      journey2: true,
      journey3: true,
      journey4: false,
      gift1: true,
      gift2: false,
    },
    {
      name: "Đinh Văn Khoa",
      phone: "0990123456",
      email: "khoa.dinh@email.com",
      journey1: true,
      journey2: true,
      journey3: true,
      journey4: true,
      gift1: true,
      gift2: true,
    },
  ];

  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { phone: customer.phone },
      update: {},
      create: {
        ...customer,
        otp: "9999",
      },
    });
  }

  console.log("Seed data đã được tạo thành công!");
  console.log("- 1 Admin: admin@samsung.com / admin123");
  console.log("- 3 Staff: staff1@samsung.com / staff123");
  console.log("- 10 Customers với các trạng thái journey khác nhau");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
