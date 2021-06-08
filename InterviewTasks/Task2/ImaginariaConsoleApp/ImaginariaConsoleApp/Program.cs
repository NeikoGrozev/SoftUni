namespace ImaginariaConsoleApp
{
    using System;

    public class Program
    {
        public static void Main()
        {
            const decimal noTaxation = 1000M;
            const decimal maxTaxation = 3000M;
            const decimal incomeTaxPercent = 0.10M;
            const decimal socialContributionsPercent = 0.15M;


            Console.Write("Please write a salary: ");
            var inputSalary = decimal.Parse(Console.ReadLine());

            var salary = 0M;
            var tax = 0M;

            if (inputSalary <= noTaxation)
            {
                salary = inputSalary;
            }
            else
            {
                var incomeTax = (inputSalary - noTaxation) * incomeTaxPercent;
                var socialContributions = 0M;

                if (inputSalary <= maxTaxation)
                {
                    socialContributions = inputSalary * socialContributionsPercent;
                }
                else
                {
                    socialContributions = (maxTaxation - noTaxation) * socialContributionsPercent;
                }

                tax = incomeTax + socialContributions;
                salary = inputSalary - tax;
            }

            if (tax != 0)
            {
                Console.WriteLine($"Total tax: {tax.ToString()} IDR");
            }

            Console.WriteLine($"Salary brutto: {salary.ToString()} IDR");
        }
    }
}
