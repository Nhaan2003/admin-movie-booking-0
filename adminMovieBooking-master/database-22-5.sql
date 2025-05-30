USE [master]
GO
/****** Object:  Database [MovieBooking]    Script Date: 5/22/2025 12:53:01 AM ******/
CREATE DATABASE [MovieBooking]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MovieBooking', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER01\MSSQL\DATA\MovieBooking.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MovieBooking_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER01\MSSQL\DATA\MovieBooking_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [MovieBooking] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MovieBooking].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MovieBooking] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MovieBooking] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MovieBooking] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MovieBooking] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MovieBooking] SET ARITHABORT OFF 
GO
ALTER DATABASE [MovieBooking] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MovieBooking] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MovieBooking] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MovieBooking] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MovieBooking] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MovieBooking] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MovieBooking] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MovieBooking] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MovieBooking] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MovieBooking] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MovieBooking] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MovieBooking] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MovieBooking] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MovieBooking] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MovieBooking] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MovieBooking] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MovieBooking] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MovieBooking] SET RECOVERY FULL 
GO
ALTER DATABASE [MovieBooking] SET  MULTI_USER 
GO
ALTER DATABASE [MovieBooking] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MovieBooking] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MovieBooking] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MovieBooking] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MovieBooking] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [MovieBooking] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'MovieBooking', N'ON'
GO
ALTER DATABASE [MovieBooking] SET QUERY_STORE = ON
GO
ALTER DATABASE [MovieBooking] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [MovieBooking]
GO
/****** Object:  User [admin]    Script Date: 5/22/2025 12:53:01 AM ******/
CREATE USER [admin] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Booking]    Script Date: 5/22/2025 12:53:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Booking](
	[BookingId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[ShowtimeId] [int] NOT NULL,
	[BookingDate] [datetime] NOT NULL,
	[Total] [int] NOT NULL,
	[Status] [nvarchar](100) NOT NULL,
	[Discount] [int] NULL,
	[PaymentId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[VnpTxnRef] [nvarchar](200) NOT NULL,
	[VoucherUserId] [int] NOT NULL,
 CONSTRAINT [PK__Booking__73951AEDAB3566DE] PRIMARY KEY CLUSTERED 
(
	[BookingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BookingFood]    Script Date: 5/22/2025 12:53:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BookingFood](
	[BookingId] [int] NOT NULL,
	[FoodId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BookingSeat]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BookingSeat](
	[BookingId] [int] NOT NULL,
	[SeatId] [int] NOT NULL,
 CONSTRAINT [PK_BookingSeat] PRIMARY KEY CLUSTERED 
(
	[BookingId] ASC,
	[SeatId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cast]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cast](
	[CastId] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Avatar] [nvarchar](200) NULL,
 CONSTRAINT [PK_Cast] PRIMARY KEY CLUSTERED 
(
	[CastId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Director]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Director](
	[DirectorId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Avatar] [nvarchar](200) NULL,
 CONSTRAINT [PK_Director] PRIMARY KEY CLUSTERED 
(
	[DirectorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Food]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Food](
	[FoodId] [int] IDENTITY(1,1) NOT NULL,
	[FoodName] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](200) NOT NULL,
	[TheaterBrandId] [int] NOT NULL,
	[Price] [int] NOT NULL,
	[Image] [nvarchar](200) NULL,
 CONSTRAINT [PK_Food] PRIMARY KEY CLUSTERED 
(
	[FoodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FoodOrder]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FoodOrder](
	[FoodOrderId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[TheaterId] [int] NOT NULL,
	[ReceiveDate] [date] NOT NULL,
	[PaymentId] [int] NOT NULL,
	[Total] [int] NOT NULL,
	[VnpTxnRef] [nchar](10) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[Status] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_FoodOrder] PRIMARY KEY CLUSTERED 
(
	[FoodOrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FoodOrderDetail]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FoodOrderDetail](
	[FoodOrderId] [int] IDENTITY(1,1) NOT NULL,
	[FoodId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_FoodOrderDetail] PRIMARY KEY CLUSTERED 
(
	[FoodOrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Genre]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Genre](
	[GenreId] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Genre] PRIMARY KEY CLUSTERED 
(
	[GenreId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Movie]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Movie](
	[MovieId] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
	[Duration] [int] NOT NULL,
	[ReleaseDate] [date] NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[DirectorId] [int] NOT NULL,
	[TrailerUrl] [nvarchar](200) NULL,
	[EnglishTitle] [nvarchar](100) NULL,
	[isAvailable] [bit] NULL,
	[PosterUrl] [nvarchar](200) NULL,
	[rating] [float] NULL,
	[Slug] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK__Movie__4BD2941A2F79E469] PRIMARY KEY CLUSTERED 
(
	[MovieId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_Movie] UNIQUE NONCLUSTERED 
(
	[Slug] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MovieCast]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MovieCast](
	[MovieId] [int] NOT NULL,
	[CastId] [int] NOT NULL,
	[CharacterName] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK_MovieCast] PRIMARY KEY CLUSTERED 
(
	[MovieId] ASC,
	[CastId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_MovieCast] UNIQUE NONCLUSTERED 
(
	[MovieId] ASC,
	[CastId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MovieGenre]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MovieGenre](
	[MovieId] [int] NOT NULL,
	[GenreId] [int] NOT NULL,
 CONSTRAINT [PK_MovieGenre] PRIMARY KEY CLUSTERED 
(
	[MovieId] ASC,
	[GenreId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[PaymentId] [int] IDENTITY(1,1) NOT NULL,
	[PaymentMethod] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Payment] PRIMARY KEY CLUSTERED 
(
	[PaymentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PriceAdjustment]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PriceAdjustment](
	[PriceAdjustmentId] [int] NOT NULL,
	[SeatTypeId] [int] NOT NULL,
	[Description] [nvarchar](200) NOT NULL,
	[DayOfWeek] [nvarchar](50) NULL,
	[SpecificDate] [date] NULL,
	[PriceIncrease] [int] NOT NULL,
 CONSTRAINT [PK_PriceAdjustment] PRIMARY KEY CLUSTERED 
(
	[PriceAdjustmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Screen]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Screen](
	[ScreenId] [int] IDENTITY(1,1) NOT NULL,
	[TheaterId] [int] NOT NULL,
	[ScreenNumber] [nvarchar](10) NOT NULL,
	[TotalSeats] [int] NULL,
 CONSTRAINT [PK__Screen__0AB60FA5C4A67733] PRIMARY KEY CLUSTERED 
(
	[ScreenId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Seat]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Seat](
	[SeatId] [int] IDENTITY(1,1) NOT NULL,
	[ScreenId] [int] NOT NULL,
	[Row] [nvarchar](1) NULL,
	[Column] [int] NOT NULL,
	[SeatTypeId] [int] NOT NULL,
 CONSTRAINT [PK__Seat__311713F3F0E08603] PRIMARY KEY CLUSTERED 
(
	[SeatId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SeatPrice]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SeatPrice](
	[SeatTypeId] [int] NOT NULL,
	[ScreenId] [int] NOT NULL,
	[Price] [int] NOT NULL,
	[SeatPriceId] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_SeatPrice] PRIMARY KEY CLUSTERED 
(
	[SeatPriceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SeatType]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SeatType](
	[SeatTypeId] [int] IDENTITY(1,1) NOT NULL,
	[TypeName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_SeatType] PRIMARY KEY CLUSTERED 
(
	[SeatTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Showtime]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Showtime](
	[ShowtimeId] [int] IDENTITY(1,1) NOT NULL,
	[MovieId] [int] NOT NULL,
	[ScreenId] [int] NOT NULL,
	[StartTime] [datetimeoffset](6) NULL,
	[EndTime] [datetimeoffset](6) NULL,
 CONSTRAINT [PK__Showtime__32D31F20AF125D1C] PRIMARY KEY CLUSTERED 
(
	[ShowtimeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ShowtimeSeat]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShowtimeSeat](
	[ShowtimeId] [int] NOT NULL,
	[SeatId] [int] NOT NULL,
	[Status] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_ShowtimeSeat] PRIMARY KEY CLUSTERED 
(
	[ShowtimeId] ASC,
	[SeatId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Theater]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Theater](
	[TheaterId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Address] [nvarchar](255) NOT NULL,
	[City] [nvarchar](50) NOT NULL,
	[TotalScreens] [int] NOT NULL,
	[TheaterBrandId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[TheaterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TheaterBrand]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TheaterBrand](
	[TheaterBrandId] [int] IDENTITY(1,1) NOT NULL,
	[TheaterBrandName] [nvarchar](100) NOT NULL,
	[Logo] [nchar](200) NOT NULL,
 CONSTRAINT [PK_TheaterBrand] PRIMARY KEY CLUSTERED 
(
	[TheaterBrandId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[PasswordHash] [nvarchar](255) NULL,
	[FullName] [nvarchar](100) NOT NULL,
	[Phone] [nvarchar](15) NULL,
	[CreatedAt] [datetime] NOT NULL,
	[Address] [nvarchar](100) NULL,
	[Avatar] [nvarchar](200) NULL,
	[Role] [nvarchar](10) NULL,
	[ProviderId] [nvarchar](20) NULL,
	[UID] [nvarchar](200) NULL,
	[IdToken] [varchar](max) NULL,
 CONSTRAINT [PK__User__1788CC4C69B137D5] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__User__A9D105347410031E] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Voucher]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Voucher](
	[VoucherId] [int] NOT NULL,
	[Discount] [int] NOT NULL,
	[ValidFrom] [date] NOT NULL,
	[ValidUntil] [date] NOT NULL,
	[MinBillPrice] [int] NOT NULL,
	[Description] [nvarchar](200) NOT NULL,
	[TheaterBrandId] [int] NOT NULL,
 CONSTRAINT [PK_Voucher] PRIMARY KEY CLUSTERED 
(
	[VoucherId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VoucherUser]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VoucherUser](
	[VoucherUserId] [int] NOT NULL,
	[VoucherId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[isUsed] [bit] NOT NULL,
 CONSTRAINT [PK_VoucherUser] PRIMARY KEY CLUSTERED 
(
	[VoucherUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Booking] ADD  CONSTRAINT [DF__Booking__Booking__4BAC3F29]  DEFAULT (getdate()) FOR [BookingDate]
GO
ALTER TABLE [dbo].[Booking] ADD  CONSTRAINT [DF__Booking__Status__4CA06362]  DEFAULT (N'Pending') FOR [Status]
GO
ALTER TABLE [dbo].[Theater] ADD  DEFAULT ((1)) FOR [TotalScreens]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF__User__CreatedAt__398D8EEE]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Booking]  WITH CHECK ADD  CONSTRAINT [FK_Booking_Payment] FOREIGN KEY([PaymentId])
REFERENCES [dbo].[Payment] ([PaymentId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Booking] CHECK CONSTRAINT [FK_Booking_Payment]
GO
ALTER TABLE [dbo].[Booking]  WITH CHECK ADD  CONSTRAINT [FK_Booking_ShowtimeId] FOREIGN KEY([ShowtimeId])
REFERENCES [dbo].[Showtime] ([ShowtimeId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Booking] CHECK CONSTRAINT [FK_Booking_ShowtimeId]
GO
ALTER TABLE [dbo].[Booking]  WITH CHECK ADD  CONSTRAINT [FK_Booking_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO
ALTER TABLE [dbo].[Booking] CHECK CONSTRAINT [FK_Booking_UserId]
GO
ALTER TABLE [dbo].[BookingFood]  WITH CHECK ADD  CONSTRAINT [FK_BookingFood_Booking] FOREIGN KEY([BookingId])
REFERENCES [dbo].[Booking] ([BookingId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[BookingFood] CHECK CONSTRAINT [FK_BookingFood_Booking]
GO
ALTER TABLE [dbo].[BookingFood]  WITH CHECK ADD  CONSTRAINT [FK_BookingFood_Food] FOREIGN KEY([FoodId])
REFERENCES [dbo].[Food] ([FoodId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[BookingFood] CHECK CONSTRAINT [FK_BookingFood_Food]
GO
ALTER TABLE [dbo].[BookingSeat]  WITH CHECK ADD  CONSTRAINT [FK_BookingSeat_BookingId] FOREIGN KEY([BookingId])
REFERENCES [dbo].[Booking] ([BookingId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[BookingSeat] CHECK CONSTRAINT [FK_BookingSeat_BookingId]
GO
ALTER TABLE [dbo].[BookingSeat]  WITH CHECK ADD  CONSTRAINT [FK_BookingSeat_SeatId] FOREIGN KEY([SeatId])
REFERENCES [dbo].[Seat] ([SeatId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BookingSeat] CHECK CONSTRAINT [FK_BookingSeat_SeatId]
GO
ALTER TABLE [dbo].[Food]  WITH CHECK ADD  CONSTRAINT [FK_Food_TheaterBrand] FOREIGN KEY([TheaterBrandId])
REFERENCES [dbo].[TheaterBrand] ([TheaterBrandId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Food] CHECK CONSTRAINT [FK_Food_TheaterBrand]
GO
ALTER TABLE [dbo].[FoodOrder]  WITH CHECK ADD  CONSTRAINT [FK_FoodOrder_FoodOrderDetail] FOREIGN KEY([FoodOrderId])
REFERENCES [dbo].[FoodOrderDetail] ([FoodOrderId])
GO
ALTER TABLE [dbo].[FoodOrder] CHECK CONSTRAINT [FK_FoodOrder_FoodOrderDetail]
GO
ALTER TABLE [dbo].[FoodOrder]  WITH CHECK ADD  CONSTRAINT [FK_FoodOrder_Payment] FOREIGN KEY([PaymentId])
REFERENCES [dbo].[Payment] ([PaymentId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[FoodOrder] CHECK CONSTRAINT [FK_FoodOrder_Payment]
GO
ALTER TABLE [dbo].[FoodOrder]  WITH CHECK ADD  CONSTRAINT [FK_FoodOrder_Theater] FOREIGN KEY([TheaterId])
REFERENCES [dbo].[Theater] ([TheaterId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[FoodOrder] CHECK CONSTRAINT [FK_FoodOrder_Theater]
GO
ALTER TABLE [dbo].[FoodOrder]  WITH CHECK ADD  CONSTRAINT [FK_FoodOrder_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[FoodOrder] CHECK CONSTRAINT [FK_FoodOrder_User]
GO
ALTER TABLE [dbo].[FoodOrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_FoodOrderDetail_Food] FOREIGN KEY([FoodId])
REFERENCES [dbo].[Food] ([FoodId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[FoodOrderDetail] CHECK CONSTRAINT [FK_FoodOrderDetail_Food]
GO
ALTER TABLE [dbo].[Movie]  WITH CHECK ADD  CONSTRAINT [FK_Movie_Director] FOREIGN KEY([DirectorId])
REFERENCES [dbo].[Director] ([DirectorId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Movie] CHECK CONSTRAINT [FK_Movie_Director]
GO
ALTER TABLE [dbo].[MovieCast]  WITH CHECK ADD  CONSTRAINT [FK_MovieCast_Cast] FOREIGN KEY([CastId])
REFERENCES [dbo].[Cast] ([CastId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[MovieCast] CHECK CONSTRAINT [FK_MovieCast_Cast]
GO
ALTER TABLE [dbo].[MovieCast]  WITH CHECK ADD  CONSTRAINT [FK_MovieCast_Movie] FOREIGN KEY([MovieId])
REFERENCES [dbo].[Movie] ([MovieId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[MovieCast] CHECK CONSTRAINT [FK_MovieCast_Movie]
GO
ALTER TABLE [dbo].[MovieGenre]  WITH CHECK ADD  CONSTRAINT [FK_MovieGenre_Genre] FOREIGN KEY([GenreId])
REFERENCES [dbo].[Genre] ([GenreId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[MovieGenre] CHECK CONSTRAINT [FK_MovieGenre_Genre]
GO
ALTER TABLE [dbo].[MovieGenre]  WITH CHECK ADD  CONSTRAINT [FK_MovieGenre_Movie] FOREIGN KEY([MovieId])
REFERENCES [dbo].[Movie] ([MovieId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[MovieGenre] CHECK CONSTRAINT [FK_MovieGenre_Movie]
GO
ALTER TABLE [dbo].[PriceAdjustment]  WITH CHECK ADD  CONSTRAINT [FK_PriceAdjustment_SeatType] FOREIGN KEY([SeatTypeId])
REFERENCES [dbo].[SeatType] ([SeatTypeId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[PriceAdjustment] CHECK CONSTRAINT [FK_PriceAdjustment_SeatType]
GO
ALTER TABLE [dbo].[Screen]  WITH CHECK ADD  CONSTRAINT [FK_Screen_TheaterId] FOREIGN KEY([TheaterId])
REFERENCES [dbo].[Theater] ([TheaterId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Screen] CHECK CONSTRAINT [FK_Screen_TheaterId]
GO
ALTER TABLE [dbo].[Seat]  WITH CHECK ADD  CONSTRAINT [FK_Seat_ScreenId] FOREIGN KEY([ScreenId])
REFERENCES [dbo].[Screen] ([ScreenId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Seat] CHECK CONSTRAINT [FK_Seat_ScreenId]
GO
ALTER TABLE [dbo].[Seat]  WITH CHECK ADD  CONSTRAINT [FK_Seat_SeatType] FOREIGN KEY([SeatTypeId])
REFERENCES [dbo].[SeatType] ([SeatTypeId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Seat] CHECK CONSTRAINT [FK_Seat_SeatType]
GO
ALTER TABLE [dbo].[SeatPrice]  WITH CHECK ADD  CONSTRAINT [FK_SeatPrice_Screen] FOREIGN KEY([ScreenId])
REFERENCES [dbo].[Screen] ([ScreenId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SeatPrice] CHECK CONSTRAINT [FK_SeatPrice_Screen]
GO
ALTER TABLE [dbo].[SeatPrice]  WITH CHECK ADD  CONSTRAINT [FK_SeatPrice_SeatType] FOREIGN KEY([SeatTypeId])
REFERENCES [dbo].[SeatType] ([SeatTypeId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[SeatPrice] CHECK CONSTRAINT [FK_SeatPrice_SeatType]
GO
ALTER TABLE [dbo].[Showtime]  WITH CHECK ADD  CONSTRAINT [FK_Showtime_MovieId] FOREIGN KEY([MovieId])
REFERENCES [dbo].[Movie] ([MovieId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Showtime] CHECK CONSTRAINT [FK_Showtime_MovieId]
GO
ALTER TABLE [dbo].[Showtime]  WITH CHECK ADD  CONSTRAINT [FK_Showtime_ScreenId] FOREIGN KEY([ScreenId])
REFERENCES [dbo].[Screen] ([ScreenId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Showtime] CHECK CONSTRAINT [FK_Showtime_ScreenId]
GO
ALTER TABLE [dbo].[ShowtimeSeat]  WITH CHECK ADD  CONSTRAINT [FK_ShowtimeSeat_Seat] FOREIGN KEY([SeatId])
REFERENCES [dbo].[Seat] ([SeatId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ShowtimeSeat] CHECK CONSTRAINT [FK_ShowtimeSeat_Seat]
GO
ALTER TABLE [dbo].[ShowtimeSeat]  WITH CHECK ADD  CONSTRAINT [FK_ShowtimeSeat_Showtime] FOREIGN KEY([ShowtimeId])
REFERENCES [dbo].[Showtime] ([ShowtimeId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ShowtimeSeat] CHECK CONSTRAINT [FK_ShowtimeSeat_Showtime]
GO
ALTER TABLE [dbo].[Theater]  WITH CHECK ADD  CONSTRAINT [FK_Theater_TheaterBrand] FOREIGN KEY([TheaterBrandId])
REFERENCES [dbo].[TheaterBrand] ([TheaterBrandId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Theater] CHECK CONSTRAINT [FK_Theater_TheaterBrand]
GO
ALTER TABLE [dbo].[Voucher]  WITH CHECK ADD  CONSTRAINT [FK_Voucher_TheaterBrand] FOREIGN KEY([TheaterBrandId])
REFERENCES [dbo].[TheaterBrand] ([TheaterBrandId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Voucher] CHECK CONSTRAINT [FK_Voucher_TheaterBrand]
GO
ALTER TABLE [dbo].[VoucherUser]  WITH CHECK ADD  CONSTRAINT [FK_VoucherUser_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[VoucherUser] CHECK CONSTRAINT [FK_VoucherUser_User]
GO
ALTER TABLE [dbo].[VoucherUser]  WITH CHECK ADD  CONSTRAINT [FK_VoucherUser_Voucher] FOREIGN KEY([VoucherId])
REFERENCES [dbo].[Voucher] ([VoucherId])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[VoucherUser] CHECK CONSTRAINT [FK_VoucherUser_Voucher]
GO
ALTER TABLE [dbo].[Booking]  WITH CHECK ADD  CONSTRAINT [CK__Booking__Status__4D94879B] CHECK  (([Status]=N'Cancelled' OR [Status]=N'Confirmed' OR [Status]=N'Pending'))
GO
ALTER TABLE [dbo].[Booking] CHECK CONSTRAINT [CK__Booking__Status__4D94879B]
GO
/****** Object:  StoredProcedure [dbo].[GetAvailableMovies]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAvailableMovies]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        m.MovieId,
        m.Title,
        m.Duration,
        m.ReleaseDate,
        m.Description,
        m.DirectorId,
        m.TrailerUrl,
        m.EnglishTitle,
        m.isAvailable,
        m.PosterUrl,
        m.rating,
        STRING_AGG(LOWER(g.Name), ', ') AS Genres
    FROM 
        (SELECT * FROM Movie WHERE isAvailable = 1) m
        LEFT JOIN MovieGenre mg ON m.MovieId = mg.MovieId
        LEFT JOIN Genre g ON mg.GenreId = g.GenreId
    GROUP BY 
        m.MovieId,
        m.Title,
        m.Duration,
        m.ReleaseDate,
        m.Description,
        m.DirectorId,
        m.TrailerUrl,
        m.EnglishTitle,
        m.isAvailable,
        m.PosterUrl,
        m.rating
    ORDER BY 
        m.MovieId DESC;
END;
GO
/****** Object:  StoredProcedure [dbo].[GetSeatPricesByScreenId]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetSeatPricesByScreenId]
    @ScreenId int
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        st.SeatTypeId,
        st.TypeName,
        sp.Price,
        COALESCE(pa.PriceIncrease, 0) AS PriceIncrease,
        (sp.Price + COALESCE(pa.PriceIncrease, 0)) AS TotalPrice
    FROM SeatType st
    INNER JOIN SeatPrice sp ON st.SeatTypeId = sp.SeatTypeId
    LEFT JOIN PriceAdjustment pa ON st.SeatTypeId = pa.SeatTypeId
        AND (
            pa.DayOfWeek = DATENAME(WEEKDAY, GETDATE())
            OR pa.SpecificDate = CAST(GETDATE() AS DATE)
        )
    WHERE sp.ScreenId = @ScreenId
    ORDER BY st.SeatTypeId;
END
GO
/****** Object:  StoredProcedure [dbo].[GetSeats]    Script Date: 5/22/2025 12:53:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetSeats]
    @showtimeID INT
AS
BEGIN
    SET NOCOUNT ON;

	Declare @screenId int
	Select @screenId = ScreenId From Showtime Where ShowtimeId = @showtimeID

    SELECT 
        s.SeatId,
        s.Row, 
        s.[Column],
        MAX(bs.BookingId) AS BookingId, -- Use MAX to get the latest or any BookingId if exists
        @showtimeID AS ShowtimeId,
		s.SeatTypeId,
		s.ScreenId,
        CASE 
            WHEN MAX(bs.SeatId) IS NULL THEN cast(1 as bit) -- Available if no booking exists
            ELSE cast(0 as bit) -- Booked if any booking exists
        END AS IsAvailable
    FROM (Select * From Seat Where ScreenId = @screenId) s
    LEFT JOIN BookingSeat bs 
		ON bs.SeatId = s.SeatId
    LEFT JOIN (Select * From Booking Where ShowtimeId = @showtimeID or ShowtimeId IS NULL) b 
		ON b.BookingId = bs.BookingId AND b.ShowtimeId = @showtimeID
    GROUP BY s.SeatId, s.Row, s.[Column], bs.SeatId, s.SeatTypeId, s.ScreenId

	--SELECT
 --       s.SeatId,
 --       s.Row,
	--	s.[Column],
 --       Max(b.BookingId) as BookingId, -- Keep NULL for unbooked seats
 --       @showtimeID as ShowtimeId,-- Assign @showtimeId to available seats
	--	s.SeatTypeId,
 --       CASE
 --           WHEN bs.SeatId IS NULL THEN cast(1 as bit)  -- Available
 --           ELSE cast(0 as bit)  -- Booked
 --       END AS isAvailable
 --   FROM Seat s
 --   LEFT JOIN BookingSeat bs ON bs.SeatId = s.SeatId
 --   LEFT JOIN Booking b ON b.BookingId = bs.BookingId
 --   WHERE b.ShowtimeId = @showtimeId OR b.ShowtimeId IS NULL
	--Group by s.SeatId, s.Row, s.[Column], bs.SeatId, s.SeatTypeId
END;
GO
USE [master]
GO
ALTER DATABASE [MovieBooking] SET  READ_WRITE 
GO
