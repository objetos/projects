+++
name = "Abundant numbers"
description = "An abundant number is a number for which the sum of its proper divisors is greater than the number itself. The amount by which the sum exceeds the number is the abundance."
image = "images/abundant.png"
source = "abundant"
url = "abundant"
oeis = "A005101"
example = "12 divisors are: 1, 2, 3, 4, 6. Sum of these is 16 and it's greater than 12."
implementations =  [
    {
        code="abundant0", 
        js="true",
        authors=[{name="Future UN", link="https://github.com/FutureUN"}],
        description="White circle represent abundant number, red circle is the sum of the divisors and medium circles are the divisors."
    },
    {
        code="abundant1",
        js="false", 
        authors=[{name="Catalina Aldana", link="https://github.com/catalina14"}], 
        keys="'+' or '-' will change terms."
    }
]
+++