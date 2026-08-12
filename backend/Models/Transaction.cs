namespace backend.Models;

public class Transaction
{
    public int Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Desc { get; set; } = string.Empty;
    public string Amount { get; set; } = string.Empty;
    public string Time { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
}
