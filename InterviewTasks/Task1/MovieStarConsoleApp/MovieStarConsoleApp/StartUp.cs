namespace MovieStarConsoleApp
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Text;

    public class StartUp
    {
        public static void Main()
        {
            var inputData = File.ReadAllText("../../../../input.txt");

            var inputStar = JsonConvert.DeserializeObject<IEnumerable<MovieStar>>(inputData);

            var sb = new StringBuilder();

            foreach (var star in inputStar)
            {
                sb.AppendLine(star.ToString());
            }

            Console.WriteLine(sb.ToString().Trim());
        }
    }
}
