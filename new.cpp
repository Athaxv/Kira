#include <bits/stdc++.h>
using namespace std;

void solve(){
    int n;
    cin>>n;
    vector<long long> a(n + 1);
    long long prev = 0;
    for(int i = 1; i <= n; i++) cin>>a[i];
    for(int i = 1; i <= n; i++){
        if (a[i] < i){
            cout<<"No"<<endl;
            return;
        }
        else if (i < n && a[i] > i){
            prev = a[i] - i;
            a[i + 1] += prev;
        }
    }
    cout<<"Yes"<<endl;
}

int main(){
    int n;
    cin>>n;
    while(n--){
        solve();
    }
    return 0;
}
