+++
name = "Abundant numbers"
description = "An abundant number is a number for which the sum of its proper divisors is greater than the number itself. The amount by which the sum exceeds the number is the abundance."
image = "images/abundant.png"
source = "abundant"
url = "abundant"
oeis = "A005101"
example = "12 divisors are: 1, 2, 3, 4, 6. Sum of these is 16 and it's greater than 12."
libraries=["p5.min.js", "processing.min.js"]
implementations =  [
    {
        code="abundant0",
        type="p5.js",
        authors=[{name="Future UN", link="https://github.com/FutureUN"}],
        description="Top circle represents the abundant number, bottom circles are the sum of divisors.",
        keys="'←' or '→' will change terms, move the mouse change color.",
        source="https://github.com/FutureUN/PresentationSusseccionsOOP"
    },
    {
        code="abundant1",
        type="processing",
        authors=[{name="Catalina Aldana", link="https://github.com/catalina14"}],
        keys="'+' or '-' will change terms."
    },
    {
        code="fibonacci0",
        type="p5.js",
        authors=[{name="Julián Salomón", link="https://github.com/JulianSalomon"}],
        keys="'+' or '-' will change terms, '<' or '>' change representation type."
    }
]
+++