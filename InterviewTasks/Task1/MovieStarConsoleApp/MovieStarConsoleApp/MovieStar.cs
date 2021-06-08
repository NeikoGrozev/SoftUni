namespace MovieStarConsoleApp
{
    using MovieStarConsoleApp.Enum;
    using System;
    using System.Text;

    public class MovieStar
    {
        public DateTime DateOfBirth { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public SexEnum Sex { get; set; }

        public NationalityEnum Nationality { get; set; }

        public override string ToString()
        {
            var currentDateTime = DateTime.Now;
            var currentBirthday = this.DateOfBirth;
            var diffDateTime = currentDateTime - currentBirthday;
            var resultDateTime = new DateTime(diffDateTime.Ticks).Year - 1;

            var sb = new StringBuilder();

            sb.AppendLine($"{this.Name} {this.Surname}");
            sb.AppendLine(this.Sex.ToString());
            sb.AppendLine(this.Nationality.ToString());
            sb.AppendLine($"{resultDateTime} years old");

            return sb.ToString();
        }
    }
}
