package custoupdaternew;
import java.sql.*;

public class custoupdaternew {
    public static void main(String[] args) {
        try {
            Connection connection = getConnection();
            String sql = "UPDATE Salesforce.Contact SET Active__c = True WHERE Active__c = False";
            updateData(connection, sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(
                "jdbc:postgresql://cqffwlovvodxih:9674ca0507ff9aca31b096889fd471356599e13ecbf36cf87ea218adc8bfb411@ec2-52-0-187-246.compute-1.amazonaws.com:5432/daq4hrjn5bbopa",
                "cqffwlovvodxih",
                "9674ca0507ff9aca31b096889fd471356599e13ecbf36cf87ea218adc8bfb411"
        );
    }

    private static void updateData(Connection connection, String sql) throws SQLException {
        try (Statement statement = connection.createStatement()) {
            int rowsUpdated = statement.executeUpdate(sql);
            System.out.println("Rows updated: " + rowsUpdated);
        }
    }
}