FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["StudentManagementSystem.csproj", "./"]
RUN dotnet restore "StudentManagementSystem.csproj"

COPY . .
RUN dotnet build "StudentManagementSystem.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StudentManagementSystem.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT ["dotnet", "StudentManagementSystem.dll"]
