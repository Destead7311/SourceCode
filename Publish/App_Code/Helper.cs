using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Numerics;

/// <summary>
/// Summary description for Helper
/// </summary>
namespace Destead
{
    /*
     * 
     * 
     * Helper class
     * 
     * Used to define all the general functionalities
     * 
     * 
     * 
     */
    public static class Helper
    {
        
        public static BigInteger GetRandomInteger() // to generate a random number
        {
            var buffer = new byte[sizeof(UInt64)];
            Random random = new Random();
            random.NextBytes(buffer);
            return BitConverter.ToUInt64(buffer, 0);
        }

        public static bool CheckIfPrime(int n) //to check if the random number generated is prime
        {
            var isPrime = true;
            var sqrt = Math.Sqrt(n);
            for (var i = 2; i <= sqrt; i++)
                if ((n % i) == 0) isPrime = false;
            return isPrime;
        }

        public static string GetPrime()
        {
            Random random = new Random();

            int p = random.Next();
            while (CheckIfPrime(p) == false) // number generated will be check if is prime,if false regenerate another random number
            {
                p = random.Next();
            }
            return p.ToString(); // output the prime number
        }
    }
}